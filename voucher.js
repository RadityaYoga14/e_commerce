// ===== VOUCHER SYSTEM CONFIGURATION =====
const validVoucherCodes = ['SAVE12OFF', 'MEGA12OFF', 'PREMIUM15', 'WELCOME10', 'SPECIAL20', 'FLASH25'];
let claimedVouchers = [];

// ===== UTILITY FUNCTIONS =====
function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    messageEl.style.display = 'block';
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 3000);
}

function markVoucherAsClaimed(voucherCode) {
    const voucherCodes = document.querySelectorAll('.voucher-code');
    voucherCodes.forEach(codeEl => {
        if (codeEl.textContent === voucherCode) {
            const voucherCard = codeEl.closest('.voucher-card');
            const claimBtn = voucherCard.querySelector('.claim-btn');
            
            voucherCard.classList.add('claimed');
            claimBtn.textContent = 'Diklaim';
            claimBtn.disabled = true;
        }
    });
}

// ===== INPUT VOUCHER VALIDATION =====
function applyVoucher() {
    const input = document.getElementById('voucherInput');
    const voucherCode = input.value.trim().toUpperCase();
    
    // Check if input is empty
    if (!voucherCode) {
        showMessage('Silakan masukkan kode voucher', 'error');
        return;
    }

    // Check if voucher code is valid
    if (validVoucherCodes.includes(voucherCode)) {
        // Check if already claimed
        if (claimedVouchers.includes(voucherCode)) {
            showMessage('Voucher sudah pernah diklaim!', 'error');
        } else {
            // Apply voucher
            showMessage(`Voucher ${voucherCode} berhasil diterapkan!`, 'success');
            claimedVouchers.push(voucherCode);
            
            // Mark voucher as claimed if it exists in the display
            markVoucherAsClaimed(voucherCode);
            
            // Save to localStorage
            saveClaimedVouchers();
        }
    } else {
        showMessage('Kode voucher tidak valid', 'error');
    }
    
    // Clear input
    input.value = '';
}

// ===== CLAIM VOUCHER FUNCTIONALITY =====
function claimVoucher(voucherId, voucherCode) {
    const voucherCard = document.getElementById(voucherId);
    const claimBtn = voucherCard.querySelector('.claim-btn');
    
    // Check if already claimed
    if (claimedVouchers.includes(voucherCode)) {
        showMessage('Voucher sudah pernah diklaim!', 'error');
        return;
    }

    // Add button animation
    claimBtn.classList.add('animate');
    
    // Add to claimed vouchers
    claimedVouchers.push(voucherCode);
    
    // Update UI - Visual state changes
    setTimeout(() => {
        voucherCard.classList.add('claimed');
        claimBtn.textContent = 'Diklaim';
        claimBtn.disabled = true;
        claimBtn.classList.remove('animate');
    }, 150);
    
    // Show success message
    showMessage(`Voucher ${voucherCode} berhasil diklaim!`, 'success');

    // Copy to clipboard (optional feature)
    if (navigator.clipboard) {
        navigator.clipboard.writeText(voucherCode).then(() => {
            console.log(`Voucher code ${voucherCode} copied to clipboard`);
        }).catch(() => {
            console.log('Could not copy to clipboard');
        });
    }
    
    // Save to localStorage
    saveClaimedVouchers();
}

// ===== LOCAL STORAGE FUNCTIONS =====
function saveClaimedVouchers() {
    localStorage.setItem('claimedVouchers', JSON.stringify(claimedVouchers));
}

function loadClaimedVouchers() {
    const saved = localStorage.getItem('claimedVouchers');
    if (saved) {
        claimedVouchers = JSON.parse(saved);
        claimedVouchers.forEach(code => markVoucherAsClaimed(code));
    }
}

// ===== EVENT LISTENERS =====
// Enter key support for input voucher
document.addEventListener('DOMContentLoaded', function() {
    const voucherInput = document.getElementById('voucherInput');
    
    if (voucherInput) {
        voucherInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyVoucher();
            }
        });
    }
    
    // Load claimed vouchers from localStorage on page load
    loadClaimedVouchers();
});

// ===== PREVENT DUPLICATE CLAIMS =====
// This is handled in both applyVoucher() and claimVoucher() functions
// by checking if the voucher code exists in claimedVouchers array

// ===== DEBUGGING FUNCTIONS (Optional) =====
function resetVouchers() {
    claimedVouchers = [];
    localStorage.removeItem('claimedVouchers');
    location.reload();
}

function getClaimedVouchers() {
    return claimedVouchers;
}

// Expose functions for debugging (remove in production)
window.voucherDebug = {
    reset: resetVouchers,
    getClaimed: getClaimedVouchers,
    validCodes: validVoucherCodes
};