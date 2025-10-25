let currentImageIndex = 0;
        let selectedColor = 'yellow';
        let selectedSize = 'M';
        let isLoved = false;
        let quantity = 1;

        

        function setMainImage(index) {
            currentImageIndex = index;
            document.getElementById('mainImage').src = images[index];
            
            // Update thumbnail active state
            document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            setMainImage(currentImageIndex);
        }

        function previousImage() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            setMainImage(currentImageIndex);
        }

        function selectColor(element, color) {
            document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('active'));
            element.classList.add('active');
            selectedColor = color;
            console.log('Selected color:', color);
        }

        function selectSize(element, size) {
            document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('active'));
            element.classList.add('active');
            selectedSize = size;
            console.log('Selected size:', size);
        }

        function increaseQuantity() {
            quantity++;
            document.getElementById('quantity').value = quantity;
        }

        function decreaseQuantity() {
            if (quantity > 1) {
                quantity--;
                document.getElementById('quantity').value = quantity;
            }
        }

        function toggleLove() {
            isLoved = !isLoved;
            const loveBtn = document.getElementById('loveBtn');
            if (isLoved) {
                loveBtn.innerHTML = '♥';
                loveBtn.classList.add('loved');
            } else {
                loveBtn.innerHTML = '♡';
                loveBtn.classList.remove('loved');
            }
            console.log('Love status:', isLoved);
        }

        function showSuccessMessage(message) {
            const successMsg = document.getElementById('successMessage');
            successMsg.textContent = message;
            successMsg.classList.add('show');
            
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 3000);
        }

        function addToCart() {
            const item = {
                name: 'Kemeja kantoran wanita',
                price: 'Rp. 799.000',
                color: selectedColor,
                size: selectedSize,
                quantity: quantity
            };
            
            console.log('Adding to cart:', item);
            showSuccessMessage('Item berhasil ditambahkan ke keranjang!');
        }

        function buyNow() {
            const item = {
                name: 'Kemeja kantoran wanita',
                price: 'Rp. 799.000',
                color: selectedColor,
                size: selectedSize,
                quantity: quantity
            };
            
            console.log('Buy now:', item);
            showSuccessMessage('Mengarahkan ke halaman checkout...');
            
            // Simulate redirect to checkout
            setTimeout(() => {
                alert('Redirecting to checkout page...');
            }, 1000);
        }

        // Initialize quantity input change handler
        document.getElementById('quantity').addEventListener('change', function() {
            const value = parseInt(this.value);
            if (value >= 1) {
                quantity = value;
            } else {
                this.value = 1;
                quantity = 1;
            }
        });

        