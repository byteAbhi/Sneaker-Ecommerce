 
              document.getElementById('sellerForm').addEventListener('submit', function (event) {
                  const sellerName = document.getElementsByName('seller_name')[0].value;
                  const mobileNo = document.getElementsByName('mobile_no')[0].value;
                  const address = document.getElementsByName('address')[0].value;
                  const email = document.getElementsByName('email')[0].value;
          
                  if (!sellerName || !mobileNo || !address || !email) {
                      alert('All fields are required!');
                      event.preventDefault(); // Prevent form submission
                  } else {
                      alert('Form submitted successfully!');
                      // You can submit the form to the server here if needed
                  }
              });
           
              