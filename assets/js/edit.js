window.onload=function(){
    createAdmin();
    createProduct();
    // taodulieudonhang
}
// Create admin
var userArray = [];
function createAdmin(){
    if(localStorage.getItem('user')==null){
        var user = {username: 'admin', password: 'admin',name: 'Zesta', phone: '0909999999', type: 'ad'};
        userArray.push(user);
        localStorage.setItem('user',JSON.stringify(userArray));
    }
    
}

// Create New User
function createNewUser(){
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
    const phone = document.getElementById('phone').value;
    const name = document.getElementById('name').value;
    if(name==""){
        document.querySelector(".errorDK3").style.display='block';
        document.getElementById('name').focus();
        return;
    }
    if(user == "" || user.length < 5 ){
        document.querySelector(".errorDK").style.display = 'block';
        document.getElementById('user').focus();
        return;
    }
    if(pass == ""||pass.length<6){
        document.querySelector(".errorDK").style.display = 'none';
        document.querySelector(".errorDK1").style.display = 'block';
        document.getElementById('pass').focus();return;
    }
    if(phone.length<10||phone==""){
        document.querySelector(".errorDK").style.display = 'none';
        document.querySelector(".errorDK2").style.display = 'block';
        document.querySelector(".errorDK1").style.display = 'none';
        document.querySelector(".errorD3").style.display = 'none';
    }
    else{
        var userArray = JSON.parse(localStorage.getItem('user'));
        if(user=="admin"){
            toast({
                title: "Thất bại!",
                message: "Không thể đăng ký tài khoản này",
                type: "error",
                duration: 3000
            });
            return;
        }
        var user1 ={username: document.getElementById("user").value, password: document.getElementById('pass').value,name: name, phone: phone,type: 'kh'};
        userArray.push(user1);
        toast({
            title: "Thành công!",
            message: "Đã thêm tài khoản",
            type: "success",
            duration: 3000
            });
        localStorage.setItem('user',JSON.stringify(userArray));   
    }    
    showUserList();
    
}
// Show user
function showUserList(){
	if(localStorage.getItem('user')==null){
		return false;
	}
	var userArray = JSON.parse(localStorage.getItem('user'));
	var list = '';
	for(var i=0; i<userArray.length;i++){
        var a =`<ul class="account-body">
        <li class="stt">`+(i+1)+`</li>
        <li class="tk">${userArray[i].name}</li>
        <li class="tk">${userArray[i].username}</li>
        <li class="mk">${userArray[i].password}</li>
        <li class="sdt">${userArray[i].phone}</li>
        <li class="del" onclick="deleteUser(\``+userArray[i].username+`\`);" ><i class="fas fa-trash-alt"></i></li>
        </ul>`;
        list+=a;
	}
	document.getElementById('printUser').innerHTML=list;
    
}

// Admin delete user

function deleteUser(usernameDelete){
    var userArray = JSON.parse(localStorage.getItem('user'));
    for(var i=0; i<userArray.length;i++){
        if(userArray[i].type=='ad'&&userArray[i].username==usernameDelete){
            toast({
                title: "Thất bại!",
                message: "Tài khoản không thể xóa",
                type: "error",
                duration: 3000
            });
        }
        else if(userArray[i].username==usernameDelete){
            if(confirm('Bạn có muốn xóa tài khoản này?')){
                toast({
                    title: "Thành công!",
                    message: "Xóa tài khoản thành công",
                    type: "success",
                    duration: 3000
                });
                userArray.splice(i, 1);
            }
        }
    }
    localStorage.setItem('user',JSON.stringify(userArray)); 
    showUserList(); 
    
}
// Toast function
function toast({ title = "", message = "", type = "", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
            main.removeChild(toast);
            clearTimeout(autoRemoveId);
        }
        };

        const icons = {
        success: "fas fa-check-circle",
        error: "fas fa-exclamation-circle"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                        <div class="toast__icon">
                            <i class="${icon}"></i>
                        </div>
                        <div class="toast__body">
                            <h3 class="toast__title">${title}</h3>
                            <p class="toast__msg">${message}</p>
                        </div>
                        <div class="toast__close">
                            <i class="fas fa-times"></i>
                        </div>
                    `;
        main.appendChild(toast);
    }
}

// Show User

function showUser(){
    document.getElementById("contentProduct").style.display='none';
    document.getElementById('contentUser').style.display='flex';
    document.getElementById("contentBill").style.display='none';
    document.getElementById("contentDT").style.display='none';
    document.getElementById("contentAE").style.display='none';
    showUserList();
    
}

// Tạo sản phẩm
function createProduct(){
	if(localStorage.getItem('products')==null){
		var products = [
			{productId:10042, brand:'msi',    img:'./assets/img/products/10042.jpg', name:'Laptop MSI Summit E13 Flip Evo A11MT 211VN', price:37990000},
			{productId:10041, brand:'asus',    img:'./assets/img/products/10041.jpg', name:'Asus ROG Flow X13 GV301QC K6029T', price:79990000},
			{productId:10040, brand:'msi',    img:'./assets/img/products/10040.jpg', name:'Laptop MSI Modern 14 B10MW 646VN', price:16790000},
			{productId:10039, brand:'khac',    img:'./assets/img/products/10039.jpg', name:'Laptop LENOVO ThinkPad L13 Gen 2 20VH004AVA', price:27290000},
			{productId:10038, brand:'dell',    img:'./assets/img/products/10038.jpg', name:'Laptop Dell Vostro 14 3400 YX51W2', price:20990000},
			{productId:10037, brand:'asus',    img:'./assets/img/products/10037.jpg', name:'Laptop Asus ZenBook Duo UX482EA KA274T', price:32490000},
			{productId:10036, brand:'dell',    img:'./assets/img/products/10036.jpg', name:'Laptop Dell 15 Inspiron 3501 P90F005N N3501B', price:17790000},
			{productId:10035, brand:'asus',    img:'./assets/img/products/10035.jpg', name:'Laptop Asus Zenbook UX425EA KI817T', price:25490000},
			{productId:10034, brand:'dell',    img:'./assets/img/products/10034.jpg', name:'Laptop Dell Vostro 3400 70253899', price:14990000},
			{productId:10033, brand:'acer',    img:'./assets/img/products/10033.jpg', name:'Laptop Acer Aspire A315 57G 524Z', price:16490000},
			{productId:10032, brand:'msi',    img:'./assets/img/products/10032.jpg', name:'Laptop MSI Creator Z16 A11UET 217VN', price:61990000},
			{productId:10031, brand:'dell',    img:'./assets/img/products/10031.jpg', name:'Laptop Dell Inspiron 15 3505 Y1N1T1', price:12990000},
			{productId:10030, brand:'asus',    img:'./assets/img/products/10030.jpg', name:'Laptop ASUS Vivobook A515EA L11171T', price:19990000},
			{productId:10029, brand:'msi',    img:'./assets/img/products/10029.jpg', name:'Laptop MSI Creator Z16 A11UET 218VN', price:66990000},
			{productId:10028, brand:'asus',    img:'./assets/img/products/10028.png', name:'Laptop Gaming Asus ROG Strix G15 G513IH HN015T', price:23290000},
			{productId:10027, brand:'asus',    img:'./assets/img/products/10027.jpg', name:'Laptop ASUS VivoBook A515EA BQ498T', price:19490000},
			{productId:10026, brand:'asus',    img:'./assets/img/products/10026.jpg', name:'ASUS ZenBook UX325EA KG363T', price:25290000},
			{productId:10025, brand:'khac',    img:'./assets/img/products/10025.jpg', name:'Laptop LG Gram 16Z90P-G.AH73A5', price:44490000},
			{productId:10024, brand:'dell',    img:'./assets/img/products/10024.jpg', name:'Laptop Dell Inspiron 14 5415 70262929', price:19590000},
			{productId:10023, brand:'khac',    img:'./assets/img/products/10023.png', name:'Laptop GIGABYTE AORUS 15P KD 72S1223GH', price:45990000},
			{productId:10022, brand:'khac',    img:'./assets/img/products/10022.jpg', name:'Laptop GIGABYTE G5 KC 5S11130SB', price:29490000},
			{productId:10021, brand:'msi',    img:'./assets/img/products/10021.jpg', name:'Laptop MSI Creator Z16 A11UET 217VN', price:61990000},
			{productId:10020, brand:'asus',    img:'./assets/img/products/10020.jpg', name:'Laptop Asus VivoBook Flip TM420IA EC227T', price:19490000},
			{productId:10019, brand:'dell',    img:'./assets/img/products/10019.jpg', name:'Laptop Dell Inspiron 3511 P112F001BBL (Black)', price:19290000},
			{productId:10018, brand:'asus',    img:'./assets/img/products/10018.jpg', name:'Laptop ASUS Vivobook X515EA BQ1006T', price:13990000},
			{productId:10017, brand:'acer',    img:'./assets/img/products/10017.jpg', name:'Laptop Acer Aspire 5 A514 54 540F', price:18290000},
			{productId:10016, brand:'acer',    img:'./assets/img/products/10016.jpg', name:'Laptop Acer Swift 3 Evo SF314 511 59LV', price:22290000},
			{productId:10015, brand:'acer',    img:'./assets/img/products/10015.jpg', name:'Laptop Acer Aspire 3 A315 57G 31YD', price:13490000},
			{productId:10014, brand:'msi',    img:'./assets/img/products/10014.jpg', name:'Laptop Gaming MSI Bravo 15 B5DD 275VN', price:24990000},
			{productId:10013, brand:'dell',    img:'./assets/img/products/10013.jpg', name:'Laptop Dell Inspiron 3501 70253897', price:22490000},
			{productId:10012, brand:'dell',     img:'./assets/img/products/10012.jpg', name:'Laptop Dell Vostro 3510 (P112F002ABL)', price:22790000},
			{productId:10011, brand:'asus',    img:'./assets/img/products/10011.jpg', name:'Laptop ASUS ZenBook UX425EA KI429T', price:23490000},
			{productId:10010, brand:'acer',    img:'./assets/img/products/10010.jpg', name:'Laptop Acer Aspire 3 A315 56 37DV', price:11990000},
			{productId:10009, brand:'acer',    img:'./assets/img/products/10009.jpg', name:'Laptop gaming Acer Nitro 5 AN515 45 R86D', price:32490000},
			{productId:10008, brand:'acer',    img:'./assets/img/products/10008.jpg', name:'Laptop Gaming Acer Nitro 5 Eagle AN515 57 720A', price:21990000},
			{productId:10007, brand:'acer',    img:'./assets/img/products/10007.jpg', name:'Laptop Gaming Acer Nitro 5 AN515 57 56S5', price:21990000},
			{productId:10006, brand:'msi',    img:'./assets/img/products/10006.png', name:'Laptop Gaming MSI GF63 Thin 10SC 020VN', price:21490000},
			{productId:10005, brand:'acer',    img:'./assets/img/products/10005.jpg', name:'Laptop Gaming Acer Aspire 7 A715 42G R4XX', price:19490000},
			{productId:10004, brand:'msi',    img:'./assets/img/products/10004.jpg', name:'Laptop Gaming MSI Katana GF66 11UC 676VN', price:24990000},
			{productId:10003, brand:'dell',    img:'./assets/img/products/10003.jpg', name:'Dell Alienware M15 R6 P109F001BBL', price:61990000},
			{productId:10002, brand:'asus',    img:'./assets/img/products/10002.jpg', name:'Asus ROG Zephyrus G14 GA401QE K2097T', price:38490000},
			{productId:10001, brand:'asus',    img:'./assets/img/products/10001.jpg', name:'Asus Vivobook A515EA L12033T', price:19790000},
			{productId:10000, brand:'asus',    img:'./assets/img/products/10000.jpg', name:'Asus TUF Gaming F15 HN002T', price:21490000},	
		];

		localStorage.setItem('products',JSON.stringify(products));
        this.renderList();
	}
}

// Show don hang
function showDonHang(){

    itemArray = JSON.parse(localStorage.getItem('giohang'));
}
//Close Gio Hang Edit
function closeGioHangEdit(){
    document.querySelector('.modal').style.display='none';
}
// Show Gio Hang Edit
function showGioHangEdit(){
    var sumPrice=0;
    document.querySelector('.gio-hang-modal').style.display = 'flex';
    var item1 = JSON.parse(localStorage.getItem('item1'));
    var printItem = '';
    if(item1.length==null){
        return false;
    }
    // var donhangsub = JSON.parse(localStorage.getItem('donhangsub'));
    
    // <div class="dh-ct">${donhangsub[i].madh}</div>
    for(i=0;i<item1.length;i++){
        var a =`   <div class="item">
            <div class="gh-img">
            <img src=".${item1[i].img}">
            </div>
            <p class="gh-name">${item1[i].name}</p>
            <p class="gh-price">${item1[i].price}</p>
            <p id="soluong" >1</p> 
            <p class="gh-sumPrice">${item1[i].price}</p>
        </div>`;
        
        sumPrice += item1[i].price;
        printItem+=a;
    }
    var donhang = JSON.parse(localStorage.getItem('donhang'));
    
    for(i=0;i<donhang.length;i++){
        var btn = `<button class="btn-confirm" onclick="confirmDonHangAdmin(\``+donhang[i].madh+`\`);">Xác nhận đơn hàng</button>`;
        
    }
    var sum = '<p class="sum">Tổng tiền:</p> <p class="price">'+sumPrice+'</p>';
    document.getElementById('gio-hang').innerHTML = printItem;
    document.getElementById("thanhtien").innerHTML = sum;
    document.querySelector('.confirm-item').innerHTML = btn;
 
}

// Show bill
function showAdminBill(){
    document.getElementById("contentProduct").style.display='none';
    document.getElementById('contentUser').style.display='none';
    document.getElementById("contentBill").style.display='flex';
    document.getElementById("contentDT").style.display='none';
    document.getElementById("contentAE").style.display='none';
    showBil();
    // taodulieudonhang();
}
function showBil(){
    
    var donhangsub = JSON.parse(localStorage.getItem('donhangsub'));
    var list='';
	for(var i=0; i<donhangsub.length;i++){
        if(i==donhangsub.length-1){
            var o= `<ul class="bill-body">
                <li class="bill-ct">${donhangsub[i].madh}</li>
                <li class="bill-day">${donhangsub[i].ngay}</li>
                <li class="bill-name">${donhangsub[i].ten}</li>
                <li class="bill-price">${donhangsub[i].gia}</li>
                <li class="bill-thongtin`+i+`">Chưa xác nhận</li>
                <li class="bill-ct bill-ct2" onclick="showGioHangEdit();"><a>Chi tiết</a></li>
                </ul>`
        }else{

            var o= `<ul class="bill-body">
                    <li class="bill-ct">${donhangsub[i].madh}</li>
                    <li class="bill-day">${donhangsub[i].ngay}</li>
                    <li class="bill-name">${donhangsub[i].ten}</li>
                    <li class="bill-price">${donhangsub[i].gia}</li>
                    <li class="bill-thongtin`+i+`">Đã xác nhận <i class="fas fa-check-circle"></i></li>
                    <li class="bill-ct bill-ct2" onclick="showGioHangEdit();"><a>Chi tiết</a></li>
                    </ul>`
        }

        list+=o;
	}
	document.getElementById('printBill').innerHTML=list;
}
// Admin xác nhận

function confirmDonHangAdmin(madh){
    document.querySelector('.gio-hang-modal').style.display = 'flex';
    var donhangsub = JSON.parse(localStorage.getItem('donhangsub'));

    var s='';
    var k=0;
    for(i=0;i<donhangsub.length;i++){
        if(donhangsub[i].madh==madh){
            k=i
            var a = `Đã xác nhận <i class="fas fa-check-circle"></i>`;
            s+=a;
            break;
        }
    }
    document.querySelector('.bill-thongtin'+k+'').innerHTML=s;
    closeGioHangEdit();
    localStorage.removeItem("item1");
    localStorage.removeItem("donhang");

}

// Them sản phẩm
function showAdd(){
    document.getElementById("contentProduct").style.display='flex';
    document.getElementById('contentUser').style.display='none';
    document.getElementById("contentBill").style.display='none';
    document.getElementById("contentDT").style.display='none';
    document.getElementById("contentAE").style.display='none';

}
function isEmpty(s){
    if(s=='')   return true;
    return false;
}
function xemtruoc(){
    const name = document.getElementById('tensp').value;
    const price = document.getElementById('price').value;
    const img = document.getElementById('myFile').value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    console.log(img)
    const brand = document.getElementById('brand').value;
    if(isEmpty(name)&&isEmpty(price)&&isEmpty(img)&&isEmpty(brand)){

        document.querySelector('.errorDK5').style.display="flex";
        document.querySelector('.errorDK6').style.display="flex";
        document.querySelector('.errorDK7').style.display="flex";
        document.querySelector('.errorDK8').style.display="flex";
        document.getElementById('ma').focus();
    }
    else if(isEmpty(name)){

        document.querySelector('.errorDK5').style.display="flex";
        document.querySelector('.errorDK6').style.display="none";
        document.querySelector('.errorDK7').style.display="none";
        document.querySelector('.errorDK8').style.display="none";
        document.getElementById('tensp').focus();
    }else if(isEmpty(price)){
        
        document.querySelector('.errorDK5').style.display="none";
        document.querySelector('.errorDK6').style.display="flex";
        document.querySelector('.errorDK7').style.display="none";
        document.querySelector('.errorDK8').style.display="none";
        document.getElementById('price').focus();
    }else if(isEmpty(img)){
        
        document.querySelector('.errorDK5').style.display="none";
        document.querySelector('.errorDK6').style.display="none";
        document.querySelector('.errorDK7').style.display="flex";
        document.querySelector('.errorDK8').style.display="none";
        document.getElementById('img').focus();
    }
    var a='';
    if(!isEmpty(name)&&!isEmpty(price)&&!isEmpty(img)&&!isEmpty(brand)){
        var s=`
            <img src="../assets/img/products/`+img+`" alt="" class="product-img">
                <div class="product-decr">
                <p class="product-name">`+name+`</p>
                <p class="product-price">`+price+`</p>
                <button onclick="" class="buy-btn">Thêm vào giỏ hàng</button>
            </div>`
            a+=s;
    }
    document.getElementById("product-body").innerHTML = a;
}
function addProduct(){
    const name = document.getElementById('tensp').value;
    const price = document.getElementById('price').value;
    const brand = document.getElementById('brand').value;
    const img = document.getElementById('myFile').value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    var products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    if(!isEmpty(name)&&!isEmpty(price)&&!isEmpty(img)&&!isEmpty(brand)){
        var pd1;
        pd1 = {productId: (10000+products.length), brand: brand,img: "./assets/img/products/"+img+"", name:name,price:price};
        products.push(pd1);
        toast({
            title: "Thành công!",
            message: "Đã thêm sản phẩm",
            type: "success",
            duration: 3000
        });
        localStorage.setItem('products',JSON.stringify(products));
    }
}


// Doanh thu
function showDT(){
    document.getElementById("contentProduct").style.display='none';
    document.getElementById('contentUser').style.display='none';
    document.getElementById("contentBill").style.display='none';
    document.getElementById("contentDT").style.display='flex';
    document.getElementById("contentAE").style.display='none';

    showDoanhThu();
}
function closeEdit(){
    document.querySelector(".modal-ae-edit").style.display='none';
}
function showDoanhThu(){
    var donhangsub = JSON.parse(localStorage.getItem('donhangsub'));
    var list='';
    var price=0;
	for(var i=0; i<donhangsub.length;i++){
        var a = `<ul class="bill-body dt-body">
                <li class="dh-ct">${donhangsub[i].madh}</li>
                <li class="dh-day">${donhangsub[i].ngay}</li>
                <li class="dh-name">${donhangsub[i].ten}</li>
                <li class="dh-price">${donhangsub[i].gia}</li>
            </ul>`;
        list+=a;
        price+=donhangsub[i].gia;
    }
    var sum = '<p class="sum sumDT">Doanh thu:</p> <p class="price">'+price+'</p>';
    document.getElementById('printDT').innerHTML=list;
    document.getElementById("thanhtien").innerHTML = sum;
}

// Sửa Xóa sp
function showAE(){
    document.getElementById("contentProduct").style.display='none';
    document.getElementById('contentUser').style.display='none';
    document.getElementById("contentBill").style.display='none';
    document.getElementById("contentDT").style.display='none';
    document.getElementById("contentAE").style.display='flex';

    renderListEdit(1);
}
function renderListEdit(sotrang){
    var products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    var sosp1trang = 4;
    var tongsotrang  = Math.ceil(products.length/sosp1trang);
    var page = '';
    for (i=1;i<=tongsotrang;i++){
        var a = `<a class="page pageae" id="`+i+`" onclick="renderListEdit(`+i+`);">`+i+`</a>`;
        page+=a;
    }
    page = `<div class="page-body">`+page+`</div>`;
    document.getElementById("pages").innerHTML=page;
    var batdau = (sotrang-1)*sosp1trang;
    var end=[];end[0]=0
    for (i=1;i<tongsotrang;i++){
        end[i]=end[i-1]+sosp1trang;
    }
    end[tongsotrang]=products.length;
    var productContents = '';
    for(i=batdau;i<end[sotrang];i++){
        var a= `<div class="item">
                    <div class="ae-img">
                        <img src=".${products[i].img}">
                    </div>
                    <p class="ae-name">${products[i].name}</p>
                    <p class="ae-price">${products[i].price}</p>
                    <div class="act act-a" onclick="editAdmin(${products[i].productId});"><a href="#" class="ae-edit">Sửa</a></div>
                    <div class="act" onclick="deleteAdmin(${products[i].productId});">
                        <i class="fas fa-trash-alt"></i>  
                    </div>
                </div>`;
        productContents+=a;
    }
    document.getElementById('printAE').innerHTML = productContents;
    document.getElementById(sotrang).style ="background-color: #000;color: white;";
}
function deleteAdmin(idDelete){
    var products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    for(i=0;i<products.length;i++){
        if(products[i].productId==idDelete){
            if(confirm('Bạn có muốn xóa sản phẩm này?')){
                toast({
                    title: "Thành công!",
                    message: "Xóa sản phẩm thành công",
                    type: "success",
                    duration: 3000
                });
                products.splice(i, 1);
            }
        }
    }
    localStorage.setItem('products',JSON.stringify(products)); 
    renderListEdit(1);  
}

function editAdmin(idEdit){
    var products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    document.querySelector(".modal-ae-edit").style.display='flex';
    
    var printEdit='';
    var index ,id,brand;
    
    for(i=0;i<products.length;i++){
        if(products[i].productId==idEdit){
            var a=`
                    <div class="edit-img">
                        <img src=".${products[i].img}">
                    </div>  
                    <div class="item-body item-body-ae">
                    <p class="text">Tên sản phẩm</p>
                    <input type="text" id="namesp" value="${products[i].name}"> 
                    <div class="container-input-error errorDK5">
                        <p class="error">
                            Vui lòng tên sản phẩm
                        </p>
                    </div>  
                     </div>
                    <div class="item-body item-body-ae">
                        <p class="text">Nhập giá</p>
                        <input type="text" id="giasp" value="${products[i].price}">   
                        <div class="container-input-error errorDK6">
                            <p class="error">
                                Vui lòng nhập giá
                        </div>
                    </div>  
                    <div class="item-body item-body-ae">
                        <p class="text">Nhập đường đẫn ảnh</p>
                        <input type="file" id="myFileEdit" name="filename">
                        
                        <div class="container-input-error errorDK7">
                            <p class="error">
                                Vui lòng đường đẫn ảnh
                            </p>
                        </div>
                    </div>`;
                    printEdit+=a;
                    index=i;
                    id = products[i].productId;
                    brand = products[i].brand;
                    break;
        }
    }
    var update = `<button class="btn-confirm " onclick="updateInfo(`+index+`,`+id+`,\``+brand+`\`);">Cập nhật</button>`;
    document.getElementById("edit").innerHTML = printEdit;
    document.querySelector(".btn-confirm-ae").innerHTML =update;
}
function updateInfo(index,id,brand){
    var products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    var img;
    if(document.getElementById('myFileEdit').value==null){
        img = products[index].img;
    }else{
        img = document.getElementById('myFileEdit').value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]
    }
    products[index]={productId: id, brand: brand,img: "./assets/img/products/"+img+"" ,name: document.getElementById("namesp").value,price:document.getElementById("giasp").value};
    localStorage.setItem('products',JSON.stringify(products)); 
    renderListEdit(1);
    closeEdit();
}
