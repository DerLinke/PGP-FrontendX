// PGP-FrontendX App Logic

// Tab Switching
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
    
    if(tabId === 'keys') {
        loadKeys();
    } else if (tabId === 'encrypt') {
        populateRecipientDropdown();
    }
}

// LocalStorage Keys Key
const STORAGE_KEY = 'pgp_keys';

// Load keys from LocalStorage
function getStoredKeys() {
    const keys = localStorage.getItem(STORAGE_KEY);
    return keys ? JSON.parse(keys) : [];
}

function saveKeys(keys) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
}

// Populate UI
function loadKeys() {
    const keys = getStoredKeys();
    const ul = document.getElementById('key-list-ul');
    ul.innerHTML = '';
    
    if(keys.length === 0) {
        ul.innerHTML = '<li><span class="text-muted">Keine Schlüssel gefunden.</span></li>';
        return;
    }
    
    keys.forEach((key, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="key-info">
                <span class="key-name">${escapeHTML(key.name)} (${key.type === 'public' ? 'Public' : 'Private'})</span>
                <span class="key-id">${escapeHTML(key.fingerprint)}</span>
            </div>
            <button class="delete-btn" onclick="deleteKey(${index})">Löschen</button>
        `;
        ul.appendChild(li);
    });
}

function populateRecipientDropdown() {
    const keys = getStoredKeys().filter(k => k.type === 'public');
    const select = document.getElementById('recipient-key');
    select.innerHTML = '<option value="">Bitte Schlüssel auswählen...</option>';
    
    keys.forEach(key => {
        const option = document.createElement('option');
        option.value = key.fingerprint;
        option.textContent = `${key.name} (${key.fingerprint.substring(0, 8)})`;
        select.appendChild(option);
    });
}

// Key Management
async function importKey() {
    const keyText = document.getElementById('import-key-text').value.trim();
    if(!keyText) return alert("Bitte einen Schlüssel einfügen.");
    
    try {
        let key;
        let type = 'public';
        
        try {
            key = await openpgp.readKey({ armoredKey: keyText });
        } catch(e) {
            key = await openpgp.readPrivateKey({ armoredKey: keyText });
            type = 'private';
        }
        
        const user = key.getUserIDs()[0] || 'Unbekannt';
        const fingerprint = key.getFingerprint();
        
        const keys = getStoredKeys();
        // Check if exists
        if(keys.find(k => k.fingerprint === fingerprint && k.type === type)) {
            return alert("Dieser Schlüssel ist bereits importiert.");
        }
        
        keys.push({
            name: user,
            fingerprint: fingerprint,
            type: type,
            armored: keyText
        });
        
        saveKeys(keys);
        document.getElementById('import-key-text').value = '';
        loadKeys();
        alert("Schlüssel erfolgreich importiert!");
        
    } catch(err) {
        console.error(err);
        alert("Fehler beim Importieren des Schlüssels. Ungültiges Format?");
    }
}

function deleteKey(index) {
    if(confirm("Diesen Schlüssel wirklich löschen?")) {
        const keys = getStoredKeys();
        keys.splice(index, 1);
        saveKeys(keys);
        loadKeys();
    }
}

// Crypto Operations
async function encryptMessage() {
    const text = document.getElementById('encrypt-text').value;
    const fingerprint = document.getElementById('recipient-key').value;
    const resultDiv = document.getElementById('encrypt-result');
    
    if(!text) return alert("Bitte Text eingeben.");
    if(!fingerprint) return alert("Bitte einen Empfänger auswählen.");
    
    try {
        const keys = getStoredKeys();
        const keyObj = keys.find(k => k.fingerprint === fingerprint && k.type === 'public');
        if(!keyObj) throw new Error("Public Key nicht gefunden.");
        
        const publicKey = await openpgp.readKey({ armoredKey: keyObj.armored });
        
        const message = await openpgp.createMessage({ text: text });
        const encrypted = await openpgp.encrypt({
            message: message,
            encryptionKeys: publicKey
        });
        
        resultDiv.style.display = 'block';
        resultDiv.textContent = encrypted;
        
    } catch(err) {
        console.error(err);
        alert("Fehler bei der Verschlüsselung: " + err.message);
    }
}

async function decryptMessage() {
    const encryptedText = document.getElementById('decrypt-text').value.trim();
    const resultDiv = document.getElementById('decrypt-result');
    
    if(!encryptedText) return alert("Bitte verschlüsselten Text eingeben.");
    
    try {
        const message = await openpgp.readMessage({ armoredMessage: encryptedText });
        
        // Find required key IDs from the message
        const keyIds = message.getEncryptionKeyIds();
        
        // Load our private keys
        const keys = getStoredKeys().filter(k => k.type === 'private');
        let privateKeyObj = null;
        
        // Very basic matching (in a real app, match Key IDs exactly)
        if(keys.length === 0) {
            return alert("Keine privaten Schlüssel gefunden. Bitte erst importieren.");
        }
        
        // For simplicity, just try the first private key if multiple exist
        // or prompt user for password if encrypted
        let privateKeyArmored = keys[0].armored;
        
        const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored });
        
        // If private key is locked with a passphrase, we would need to decrypt it first.
        // For now we assume unencrypted private key or handle error.
        if (privateKey.isDecrypted() === false) {
             const password = prompt("Passwort für diesen privaten Schlüssel:");
             await privateKey.decrypt(password);
        }

        const { data: decrypted } = await openpgp.decrypt({
            message: message,
            decryptionKeys: privateKey
        });
        
        resultDiv.style.display = 'block';
        resultDiv.textContent = decrypted;
        
    } catch(err) {
        console.error(err);
        alert("Fehler bei der Entschlüsselung. Falscher Schlüssel oder Passwort? " + err.message);
    }
}

// Utils
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// Init
window.onload = () => {
    populateRecipientDropdown();
};
