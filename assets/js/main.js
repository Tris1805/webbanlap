const dky = document.querySelector('.modalDK')
function openFormDK(){
    dky.style.display = 'flex';
    document.getElementById('name').focus();
}
function closeForm(){
    dky.style.display = 'none';
}
const dn = document.querySelector('.modalDN');
function openFormDN(){
    dn.style.display = 'flex';
    document.getElementById('user2').focus();
}
function closeFormDN(){
    dn.style.display = 'none';
}
window.onload=function(){
    createAdmin();
    createProduct();
    renderList(1);
    typeMenu();
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
// Login
function login(){
    var username = document.getElementById('user2').value;
    var password = document.getElementById('pass2').value;
    var userArray = JSON.parse(localStorage.getItem('user'));
    document.getElementById('user2').focus();
    if(username == ""){
        document.querySelector(".errorDN1").style.display = 'block';
        document.getElementById('user2').focus();
        return;
    }
    if(password == ""){
        document.querySelector(".errorDN1").style.display = 'none';
        document.querySelector(".errorDN2").style.display = 'block';
        document.getElementById('pass2').focus();return;
    }
    var flag = 0;
    var s='';
    for(i=0;i<userArray.length;){
        if(userArray[i].username==username && userArray[i].password==password){
            if(userArray[i].type=='ad'){
                window.location.href= "../admin/admin.html";
                flag=1;
            }
            s += '<li class="header__navbar-item header__navbar-item--strong header__navbar-item--separate">'+userArray[i].username+'</li>';
            // window.location="index.html";
            
            closeFormDN();
            flag=1;
            break;
        }else{
            ++i;
        }
    }
    if(flag==1){
        toast({
            title: "Thành công!",
            message: "Đăng nhập thành công thành công",
            type: "success",
            duration: 3000
        });
        document.getElementById('logout').innerHTML ='<a class="header__navbar-item onclick="logout();">Đăng xuất</a>';
        document.getElementById('resign').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById("tentk").innerHTML = s;
        return 1;
    }else{
        toast({
            title: "Thất bại!",
            message: "Tài khoản hoặc mật khẩu không chính xác",
            type: "error",
            duration: 3000
        });
        return 0;
    }
}
function DNhap(){
    var username = document.getElementById('user2').value;
    var password = document.getElementById('pass2').value;
    var userArray = JSON.parse(localStorage.getItem('user'));
    document.getElementById('user2').focus();
    if(username == ""){
        document.querySelector(".errorDN1").style.display = 'block';
        document.getElementById('user2').focus();
        return;
    }
    if(password == ""){
        document.querySelector(".errorDN1").style.display = 'none';
        document.querySelector(".errorDN2").style.display = 'block';
        document.getElementById('pass2').focus();return;
    }
    var flag = 0;
    var s='';
    for(i=0;i<userArray.length;){
        if(userArray[i].username==username && userArray[i].password==password){
            if(userArray[i].type=='ad'){
                window.location.href= "../admin/admin.html";
                flag=1;
            }
            s += '<li class="header__navbar-item header__navbar-item--strong header__navbar-item--separate">'+userArray[i].username+'</li>';
            // window.location="index.html";
            
            closeFormDN();
            flag=1;
            break;
        }else{
            ++i;
        }
    }
    if(flag==1){
       
        document.getElementById('logout').innerHTML ='<a class="header__navbar-item onclick="logout();">Đăng xuất</a>';
        document.getElementById('resign').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById("tentk").innerHTML = s;
        return true;
    }else{
        
        return false;
    }
}
//logout
function logout(){
    window.location = 'index.html';
}

// Create New User
function createNewUser(){
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
    const repass = document.getElementById('repass').value;
    const name =document.getElementById('name').value;
    if(name==""){
        document.querySelector(".errorDK4").style.display='block';
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

    if(pass!=repass || repass ==""){
        document.querySelector(".errorDK").style.display = 'none';
        document.querySelector(".errorDK1").style.display = 'none';
        document.querySelector(".errorDK2").style.display = 'block';
        repass = document.getElementById('repass').focus();return;
    }
    if(document.querySelector('.input-phone').value==""||document.querySelector('.input-phone').value.length<10){
        document.querySelector(".errorDK3").style.display = 'block';
        document.querySelector(".errorDK").style.display = 'none';
        document.querySelector(".errorDK1").style.display = 'none';
        document.querySelector(".errorDK2").style.display = 'none';
        document.querySelector('input-phone').focus();return;
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
        var user1 ={username: document.getElementById("user").value, password: document.getElementById('pass').value, name: name, phone: document.querySelector(".input-phone").value,type: 'kh'};
        userArray.push(user1);
        toast({
            title: "Thành công!",
            message: "Đăng ký tài khoản tại Zesta shop thành công",
            type: "success",
            duration: 3000
            });
        dky.style.display = 'none';
        localStorage.setItem('user',JSON.stringify(userArray));   
    }
}

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
// In san pham
function renderList(sotrang){
    var products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    var sosp1trang = 8;
    var tongsotrang  = Math.ceil(products.length/sosp1trang);
    var page = '';
    for (i=1;i<=tongsotrang;i++){
        var a = `<a href="#content" class="page" id="`+i+`" onclick="renderList(`+i+`);">`+i+`</a>`;
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
    for(var i=batdau;i<end[sotrang];i++){
        productContents += `
            <li class="product-body">
                <img src="${products[i].img}" alt="" class="product-img">
                <div class="product-decr">
                <p class="product-name">${products[i].name}</p>
                <p class="product-price">${products[i].price}</p>
                <button onclick="addGioHang(${products[i].productId});" class="buy-btn">Thêm vào giỏ hàng</button>
                </div>    
            </li>    
                
        `   
    }
    productContents =  `<ul id = product-items >`+productContents+`</ul>`;
    document.getElementById('divproduct').innerHTML = productContents;
    document.getElementById(sotrang).style ="background-color: #000;color: white;"
} 
// Loai san pham
function type(id, brand){
    this.id= id;
    this.brand= brand;
}
var typeArr = [
    new type('asus','Máy tính ASUS'),
    new type('dell','Máy tinh DELL'),
    new type('msi','Máy tính MSI'),
    new type ('acer','Máy tính ACER'),
    new type ('khac','Máy tính khác'),
];
// left menu
function typeMenu(){
    var s ="";
    for (i=0;i<typeArr.length;i++){
        var  a = '<li><a href="#content" onclick="changeType(\''+typeArr[i].id+'\');">'+typeArr[i].brand+'</a></li>';
        s+=a;
    }
    s= '<ul>'+s+'</ul>';
    document.getElementById("left-menu").innerHTML=s;
    if(localStorage.getItem('type')==null){
        localStorage.setItem('type',JSON.stringify(typeArr));
    }
}
// left menu
var tmp=[];
function changeType(id){
    var products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    var count=0;
    var j=0;
    for (i=0;i<products.length;i++){
        if(products[i].brand==id){
            tmp[j] = products[i];
            j++;
            count++;
        }
    }
    var sosp1trang = 8;
    var tongsotrang  = Math.ceil(count/sosp1trang);
    var page = '';
    for (i=1;i<=tongsotrang;i++){       
        var a = '<a href="#content" class="page" id="renderChild" onclick="renderListChild('+i+','+count+','+tongsotrang+');">'+i+'</a>';
        page+=a;
    }
    page = `<div class="page-body">`+page+`</div>`;
    document.getElementById("pages").innerHTML=page;
    // var productContents = '';
    // for(var k=start;k<end;k++){
    //     if(tmp[k]==null)break;
    //     productContents += `
    //         <li class="product-body">
    //             <img src="${tmp[k].img}" alt="" class="product-img">
    //             <div class="product-decr">
    //             <p class="product-name">${tmp[k].name}</p>
    //             <p class="product-price">${tmp[k].price}</p>
    //             <button onclick="addGioHang(${tmp[k].productId});" class="buy-btn">Thêm vào giỏ hàng</button>
    //             </div>    
    //         </li>    
            
    //     `   
    //     count=0;
    // // }
    // productContents =  `<ul id = product-items >`+productContents+`</ul>`;
    // document.getElementById('divproduct').innerHTML = productContents;
    renderListChild(1,count,tongsotrang);
    

}
// chuyen trang trong san pham con
function renderListChild(sotrang,count,tongsotrang){
    console.log(count);
    var sosp1trang = 8;
    var start = (sotrang-1)*sosp1trang;
    var end = [];end[0]=0;
    for (i=1;i<tongsotrang;i++){
        end[i]=end[i-1]+sosp1trang;
    }
    end[tongsotrang]=count;
    var productContents = '';
    for(var j=start;j<end[sotrang];j++){
        if(tmp[j]==null)break;
            productContents += `
            <li class="product-body">
                <img src="${tmp[j].img}" alt="" class="product-img">
                <div class="product-decr">
                <p class="product-name">${tmp[j].name}</p>
                <p class="product-price">${tmp[j].price}</p>
                <button onclick="addGioHang(${tmp[j].productId});" class="buy-btn">Thêm vào giỏ hàng</button>
                </div>    
            </li>    
                
        `   
    }
    productContents =  `<ul id = product-items >`+productContents+`</ul>`;
    document.getElementById('divproduct').innerHTML = productContents; 
}

// Thêm vào giỏ hàng
function addGioHang(id){
    if(DNhap()==true){
        
        var itemArray=[];
        var item=[];
        var products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
        if(localStorage.getItem('giohang')==null){
            localStorage.setItem('giohang',JSON.stringify(itemArray));
        }
        itemArray = JSON.parse(localStorage.getItem('giohang'));
        var j=0;
        for (i=0;i<products.length;i++){
            if(products[i].productId==id){
                toast({
                    title: "Thành công!",
                    message: "Đã thêm vào giỏ hàng",
                    type: "success",
                    duration: 3000
                });   
                item[j] = products[i];
                itemArray.push(item[j]);
                ++j;
                localStorage.setItem('giohang',JSON.stringify(itemArray));
            }   
        }
    }else{
        toast({
            title: "Thất bại!",
            message: "Vui lòng đăng nhập",
            type: "error",
            duration: 3000
        });
        
    }
    
} 
// Hiển thị giỏ hàng
function showGioHang(){
    document.querySelector('.gio-hang-modal').style.display = 'flex';
    var itemArray = JSON.parse(localStorage.getItem('giohang'));
        if(itemArray ==null){
            return ;
        }
    var printItem = '';
    var sumPrice=0;
    for(i=0;i<itemArray.length;i++){
        var a =`   <div class="item">
        <div class="gh-img">
        <img src="${itemArray[i].img}">
        </div>
        <p class="gh-name">${itemArray[i].name}</p>
        <p class="gh-price">${itemArray[i].price}</p>
        <p id="soluong" >1</p> 
        <p class="gh-sumPrice">${itemArray[i].price}</p>
        <div class="act" onclick="deleteItem(${itemArray[i].productId});">
        <i class="fas fa-trash-alt" ></i>
        </div>
        </div>`;
        sumPrice += itemArray[i].price;
        printItem+=a;
    }
    var sum = '<p class="sum">Tổng tiền:</p> <p class="price">'+sumPrice+'</p>';
    document.getElementById('gio-hang').innerHTML = printItem;
    document.getElementById("thanhtien").innerHTML = sum;
}

// Xoa san pham trong gio hang
function deleteItem(idDelete){
    document.querySelector('.gio-hang-modal').style.display = 'flex';
    var itemArray = JSON.parse(localStorage.getItem('giohang'));
    if(itemArray ==null){
        return false;
    }
    for(i=0;i<itemArray.length;i++){
        if(itemArray[i].productId==idDelete){
            if(confirm('Bạn có muốn xóa san pham này?')){
                toast({
                    title: "Thành công!",
                    message: "Xóa sản phẩm thành công",
                    type: "success",
                    duration: 3000
                    });
				itemArray.splice(i, 1);
            }
        }
    }  
    localStorage.setItem('giohang',JSON.stringify(itemArray));
    showItemAfterDelete();
}
// SHOW ITEM AFTER DELETE
function showItemAfterDelete(){
    var itemArray = JSON.parse(localStorage.getItem('giohang')); 
    var printItem ='';
    var sumPrice=0;
    if(localStorage.getItem('giohang')==null){
        return false;
    }
    for(i=0;i<itemArray.length;i++){
        var a =`
                        <div class="item">
                            <div class="gh-img">
                                    <img src="${itemArray[i].img}">
                            </div>
                            <p class="gh-name">${itemArray[i].name}</p>
                            <p class="gh-price">${itemArray[i].price}</p>
                            <input type="number" id="soluong" value="1">
                            <p class="gh-sumPrice">${itemArray[i].price}</p>
                            <div class="act" onclick="deleteItem(${itemArray[i].productId});">
                                <i class="fas fa-trash-alt" ></i>
                            </div>
                        </div>`;   
        printItem+=a;
        sumPrice += itemArray[i].price;
    }
    var sum = '<p class="sum">Tổng tiền:</p> <p class="price">'+sumPrice+'</p>';
    document.getElementById('gio-hang').innerHTML = printItem;
    document.getElementById("thanhtien").innerHTML = sum;
}

function closeGioHang(){
    document.querySelector('.gio-hang-modal').style.display = 'none';
}

// xac nhan mail khuyen mai
function confirmDiscount(){
    if(document.getElementById("discountMail").value){
        toast({
            title: "Thành công!",
            message: "Chúng tôi sẽ thông báo khi có thông tin khuyến mãi",
            type: "success",
            duration: 3000
            });
    }else{
        toast({
            title: "Thất bại!",
            message: "Vui lòng nhập email",
            type: "error",
            duration: 3000
        });
        document.getElementById("discountMail").focus();
    }
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
// Xác nhận đơn hàng
function confirmDonHang(){
    var itemArray = JSON.parse(localStorage.getItem('giohang'));
    var username = document.getElementById('user2').value;
    var today = new Date();
    var date =  today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();  
    if(itemArray==0){
        toast({
            title: "Thất bại!",
            message: "Có lỗi trong quá trình xử lý",
            type: "error",
            duration: 3000
        });
        document.querySelector('.gio-hang-modal').style.display = 'none';
    }
    if(itemArray!=0){
        toast({
        title: "Thành công!",
        message: "Xác nhận đơn hành thành công",
        type: "success",
        duration: 3000
        }); 
        document.querySelector('.gio-hang-modal').style.display = 'none';
    }
    if(localStorage.getItem('giohang')==null){
        localStorage.setItem('giohang',JSON.stringify(itemArray));
    }
    var item1 =[];
    var tmp = [],j=0;
    
    if(localStorage.getItem('item1')==null){
        for(i=0;i<itemArray.length;i++){
            tmp[j] = itemArray[i];
            item1.push(tmp[j]);
            j++;
            localStorage.setItem('item1',JSON.stringify(item1));
        }
    }
    var sumPrice=0;
    for(i=0;i<item1.length;i++){
        sumPrice += item1[i].price;
    }
    var donhang=[];
    // donhang = (localStorage.getItem('donhang'));
    if(localStorage.getItem('donhang')==null){
        var dh; 
        dh = {madh: Math.floor(Math.random() * 100),ngay: date,ten: username,gia: sumPrice};
        donhang.push(dh); 
        localStorage.setItem('donhang',JSON.stringify(donhang));
    }
    localStorage.removeItem("giohang");
    var donhangsub=[];
    var donhang = JSON.parse(localStorage.getItem('donhang'));
    if(localStorage.getItem('donhangsub')==null){
        var dhs;
        dhs = donhang[0];
        donhangsub.push(dhs); 
        localStorage.setItem('donhangsub',JSON.stringify(donhangsub));      
    }else{
        var donhangsub = JSON.parse(localStorage.getItem('donhangsub'));
        var dhs;
        dhs = donhang[0];
        donhangsub.push(dhs); 
        localStorage.setItem('donhangsub',JSON.stringify(donhangsub)); 
    }
}


// Slide show
var slideIndex = 0;
    showSlides();

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
     
        slides[slideIndex-1].style.display = "flex";  
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }
// Show header
const header = document.querySelector('.header__topmenu');
const headerHeight = header.clientHeight;
function showHeader(){
    var isClosed = header.clientHeight === headerHeight;
    if (isClosed){
        header.style.height = 'auto';
    }else {
        header.style.height = null;
    }
    document.querySelector('.header__topmenu-list').style.backgroundColor = '#032a55';
    document.getElementById('slide-show').style.display='none';
}
var menuItems = document.querySelectorAll('.header__topmenu-item')
for(i=0;i<menuItems.length;i++){
    var menuItem = menuItems[i];
            
    menuItem.onclick = function(){
        header.style.height = null;
        document.getElementById('slide-show').style.display='flex';
    }
}

// // Don hang
// function taodulieudonhang(){
    
//     var item1 = JSON.parse(localStorage.getItem('item1'));
//     var today = new Date();
//     var date =  today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(); 
//     if(item1.length==null){
//         return false;
//     }
//     var sumPrice;
//     for(i=0;i<item1.length;i++){
//         sumPrice += item1[i].price;
//     }
//     if(localStorage.getItem('donhang')==null){
//         localStorage.setItem('donhang',JSON.stringify(donhang));
//     }
   
    
// }