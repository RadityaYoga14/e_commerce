let currentImageIndex = 0;
        let selectedColor = 'yellow';
        let selectedSize = 'M';
        let isLoved = false;
        let quantity = 1;

        const images = [
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjZjVmNWY1Ii8+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMCwxMDApIj4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNmMGVhZDYiIHJ4PSIxMCIvPgo8cGF0aCBkPSJNNTAgNTBMMTUwIDUwTDE1MCAyMDBMNTAgMjAwWiIgZmlsbD0iI2Y5ZjlmOSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjMwIiBmaWxsPSIjZGRkIi8+CjxyZWN0IHg9IjcwIiB5PSIyNTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmOWY5ZjkiLz4KPC9nPgo8dGV4dCB4PSIyMDAiIHk9IjUzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5LZW1lamEgS2FudG9yYW48L3RleHQ+CjwvHN2Zz4K",
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjZjlmOWY5Ii8+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMCwxMDApIj4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNmOWY5ZjkiIHJ4PSIxMCIvPgo8cGF0aCBkPSJNNTAgNTBMMTUwIDUwTDE1MCAyMDBMNTAgMjAwWiIgZmlsbD0iI2YwZWFkNiIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjMwIiBmaWxsPSIjZGRkIi8+CjxyZWN0IHg9IjcwIiB5PSIyNTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmMGVhZDYiLz4KPC9nPgo8dGV4dCB4PSIyMDAiIHk9IjUzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WaWV3IDI8L3RleHQ+CjwvHN2Zz4K"
        ];

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