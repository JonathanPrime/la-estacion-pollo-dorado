
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .nav');
var carritoEnTexto = "";

setTimeout(() => {
 /*  document.getElementsByClassName("btn-s")[0].click();
  document.getElementsByClassName("btn-p")[0].click(); */
  document.getElementsByClassName("btn-a")[0].click();
}, 1000);

document.querySelector('.header').classList.add('active');


menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if (window.scrollY > 0) {
    document.querySelector('.header').classList.add('active');
  } else {
    document.querySelector('.header').classList.add('active');
  }
}

// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];
  document.addEventListener('DOMContentLoaded', () => {
    // Cargar desde localStorage o inicializar como arreglo vacío
    cart = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
  });
  
  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount.toString();
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return totalCart.toString();
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = item.price * item.count.toString();
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  carritoEnTexto = "";
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for (var i in cartArray) {
     output += "<tr>"
        + "<td id='name' style='word-break: break-all;'>" + cartArray[i].name + "</td>"
        + "<td id='value'>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'>"
        /* + "<button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" */
        + "<input type='number' class='item-count form-control' disabled data-name='" + cartArray[i].name + "' id='cant' value='" + cartArray[i].count + "'>"
        /* + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button>" */
        "</div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = "
        + "<td id='total_cant' style='font-size: 10px;'>" + cartArray[i].total + "</td>"
        + "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());

  if (cartArray.length > 0) {
     let espacio = "%20";
     let textoFormateado = espacio + "(" + "x" + cartArray[i].count + espacio + cartArray[i].name + espacio + "de" + espacio + cartArray[i].price + espacio + ")" + espacio;
     carritoEnTexto = agregaTextoABase(carritoEnTexto, "", textoFormateado);
     console.log("Esto es carrito ----> " + carritoEnTexto);
  }
  // Agrega texto a los elemtos que se muestran en el carrito.¡
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

function agregaTextoABase(base, textoAlInicio, textoAlFinal) {
  base = textoAlInicio + base + textoAlFinal;
  return base;
}

displayCart();

$('#customers-testimonials-emp').owlCarousel({
  interval: false,
  nav: true,
  navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
  items: 3,
  margin: 0,
  autoplay: false,
  dots: false,
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1170: {
      items: 2
    },
    1800: {
      items: 2
    }
  }
});

$('#customers-testimonials-bro').owlCarousel({
  interval: false,
  nav: true,
  navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
  items: 3,
  margin: 0,
  autoplay: false,
  dots: false,
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1170: {
      items: 3
    },
    1800: {
      items: 3
    }
  }
});

$('#customers-testimonials-pai').owlCarousel({
  interval: false,
  nav: true,
  navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
  items: 3,
  margin: 0,
  autoplay: false,
  dots: false,
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1170: {
      items: 3
    },
    1800: {
      items: 3
    }
  }
});

$('#customers-testimonials-chi').owlCarousel({
  interval: false,
  nav: true,
  navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
  items: 3,
  margin: 0,
  autoplay: false,
  dots: false,
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1170: {
      items: 3
    },
    1800: {
      items: 3
    }
  }
});

$('#customers-testimonials-pll').owlCarousel({
  nav: true,
  navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
  items: 3,
  margin: 0,
  autoplay: false,
  dots: false,

  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1170: {
      items: 3
    },
    1800: {
      items: 3
    }
  }
});

$('#customers-testimonials-acom').owlCarousel({
  /* rtl: true, */
  nav: true,
  navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
  items: 3,
  margin: 0,
  autoplay: false,
  dots: false,

  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1170: {
      items: 3
    },
    1800: {
      items: 3
    }
  }
});

$('#customers-testimonials-beb').owlCarousel({
  /* rtl: true, */
  nav: true,
  navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
  items: 3,
  margin: 0,
  autoplay: false,
  dots: false,

  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1170: {
      items: 3
    },
    1800: {
      items: 3
    }
  }
});

$('#customers-testimonials-fast').owlCarousel({
  /* rtl: true, */
  nav: true,
  navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
  items: 3,
  margin: 0,
  autoplay: false,
  dots: false,

  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1170: {
      items: 3
    },
    1800: {
      items: 3
    }
  }
});


$('#customers-testimonials-mini').owlCarousel({
  /* rtl: true, */
  nav: true,
  navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
  items: 3,
  margin: 0,
  autoplay: false,
  dots: false,

  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1170: {
      items: 3
    },
    1800: {
      items: 3
    }
  }
});

$('#customers-testimonials').owlCarousel({
  /* rtl: true, */
  nav: true,
  navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
  items: 3,
  margin: 0,
  autoplay: false,
  dots: false,

  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1170: {
      items: 3
    },
    1800: {
      items: 3
    }
  }
});

var totalItems = $('.item').length;
if (totalItems > 3) {
  $('.owl-carousel .item').each(function () {
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
    if (next.next().length > 0) {
      next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
    }
    else {
      $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    }
  });
}
else {
  (function () {
    $('.owl-carousel .item').each(function () {
      var itemToClone = $(this);
      for (var i = 1; i < 2; i++) {
        itemToClone = itemToClone.next();
        if (!itemToClone.length) {
          itemToClone = $(this).siblings(':first');
        }
        itemToClone.children(':first-child').clone()
          .addClass("cloneditem-" + (i))
          .appendTo($(this));
        jQuery('.owl-carousel').on('slid.bs.carousel', function () {
          var totalItems = jQuery('.owl-carousel .item').length;
          var currentIndex = jQuery('.owl-carousel .item div.active').index() + 1;
          if (totalItems == currentIndex) {
            clearInterval(jQuery('.owl-carousel .item').data('bs.carousel').interval);
          }
        });
      }
    });
  }());
}

popupWhatsApp = () => {

  let btnClosePopup = document.querySelector('.closePopup');
  let btnOpenPopup = document.querySelector('.whatsapp-button');
  let popup = document.querySelector('.popup-whatsapp');
  let sendBtn = document.getElementById('send-btn');

  btnClosePopup.addEventListener("click", () => {
    popup.classList.toggle('is-active-whatsapp-popup')
  })

  btnOpenPopup.addEventListener("click", () => {
    popup.classList.toggle('is-active-whatsapp-popup')
    popup.style.animation = "fadeIn .6s 0.0s both";
  })

  sendBtn.addEventListener("click", () => {
    let msg = document.getElementById('whats-in').value;
    let relmsg = msg.replace(/ /g, "%20");
    //just change the numbers "1515551234567" for your number. Don't use +001-(555)1234567     
    window.open('https://wa.me/573214815958?text=' + relmsg, '_blank');

  });
  /* Open pop-up in 15 seconds */
  /* setTimeout(() => {
    popup.classList.toggle('is-active-whatsapp-popup');
  }, 15000); */
}

let btnModal = document.getElementById('modal-data');
var modal = document.getElementById("cart");
var modalClose = document.getElementById("close-modal-data");
var modalCloseX = document.getElementById("close-x");

btnModal.addEventListener("click", () => {
  modal.style.display="none";
});

modalClose.addEventListener("click", () => {
  modal.style.display="unset";
});

modalCloseX.addEventListener("click", () => {
  modal.style.display="unset";
});


/* sendOrder = () => { */
  
  let sendOrderBtn = document.getElementById('send_order');
  sendOrderBtn.addEventListener("click", () => {

    let name = document.getElementById('name_user').value;
    let tel = document.getElementById('tel_user').value;
    let dir = document.getElementById('dir_user').value;

    if (name == null || tel == null || dir == null 
      || name == "" || tel == "" || dir == ""){  
      return alert('Por favor llene los campos correspondientes.'); ;  
    } else {
      var name_user = document.getElementById('name_user').value;
      let name_user_uri = name_user.replace(/ /g,"%20").replace(/#/g, "Num.");
      var tel_user = document.getElementById('tel_user').value;
      let tel_user_uri = tel_user.replace(/ /g,"%20").replace(/#/g, "Num.");
      var dir_user = document.getElementById('dir_user').value;
      let dir_user_uri = dir_user.replace(/ /g,"%20").replace(/#/g, "Num.");
      let msg = document.getElementById('send_order').value;
      let relmsg = msg.replace(/ /g,"%20");
      var total_order = document.getElementById("total_order").innerHTML.toString();
  
     window.open('https://wa.me/573214815958?text='+ relmsg + "%0a"
    + "---------------------------------" + "%0a"
    + "       DATOS DEL PEDIDO          " + "%0a"
    + "---------------------------------" + "%0a"
    + carritoEnTexto + "%0a"
    + "Total orden: $" + total_order + "%0a"
    + "---------------------------------" + "%0a"
    + "       DATOS DE CONTACTO          " + "%0a"
    + "---------------------------------" + "%0a"
    + "Nombre: " + name_user_uri + "%0a"
    + "Teléfono:" + tel_user_uri + "%0a" 
    + "Dirección: " + dir_user_uri + "%0a"
    + "---------------------------------" + "%0a"
    + "Muchas gracias.",
    '_blank'); 
    }
  });
/* } */
/* } */

const $window = $(window);
const $body = $('body');

class Slideshow {
  constructor(userOptions = {}) {
    const defaultOptions = {
      $el: $('.slideshow'),
      showArrows: false,
      showPagination: true,
      duration: 6000,
      autoplay: true
    };
    let options = Object.assign({}, defaultOptions, userOptions);
    this.$el = options.$el;
    this.maxSlide = this.$el.find($('.js-slider-home-slide')).length;
    this.showArrows = this.maxSlide > 1 ? options.showArrows : false;
    this.showPagination = options.showPagination;
    this.currentSlide = 1;
    this.isAnimating = false;
    this.animationDuration = 1200;
    this.autoplaySpeed = options.duration;
    this.interval;
    this.$controls = this.$el.find('.js-slider-home-button');
    this.autoplay = this.maxSlide > 1 ? options.autoplay : false;
    this.$el.on('click', '.js-slider-home-next', event => this.nextSlide());
    this.$el.on('click', '.js-slider-home-prev', event => this.prevSlide());
    this.$el.on('click', '.js-pagination-item', event => {
      if (!this.isAnimating) {
        this.preventClick();
        this.goToSlide(event.target.dataset.slide);
      }
    });
    this.init();
  }

  init() {
    this.goToSlide(1);

    if (this.autoplay) {
      this.startAutoplay();
    }

    if (this.showPagination) {
      let paginationNumber = this.maxSlide;
      let pagination = '<div class="pagination"><div class="container">';

      for (let i = 0; i < this.maxSlide; i++) {
        let item = `<span class="pagination__item js-pagination-item ${i === 0 ? 'is-current' : ''}" data-slide=${i + 1}>${i + 1}</span>`;
        pagination = pagination + item;
      }

      pagination = pagination + '</div></div>';
      this.$el.append(pagination);
    }
  }

  preventClick() {
    this.isAnimating = true;
    this.$controls.prop('disabled', true);
    clearInterval(this.interval);
    setTimeout(() => {
      this.isAnimating = false;
      this.$controls.prop('disabled', false);

      if (this.autoplay) {
        this.startAutoplay();
      }
    }, this.animationDuration);
  }

  goToSlide(index) {
    this.currentSlide = parseInt(index);

    if (this.currentSlide > this.maxSlide) {
      this.currentSlide = 1;
    }

    if (this.currentSlide === 0) {
      this.currentSlide = this.maxSlide;
    }

    const newCurrent = this.$el.find('.js-slider-home-slide[data-slide="' + this.currentSlide + '"]');
    const newPrev = this.currentSlide === 1 ? this.$el.find('.js-slider-home-slide').last() : newCurrent.prev('.js-slider-home-slide');
    const newNext = this.currentSlide === this.maxSlide ? this.$el.find('.js-slider-home-slide').first() : newCurrent.next('.js-slider-home-slide');
    this.$el.find('.js-slider-home-slide').removeClass('is-prev is-next is-current');
    this.$el.find('.js-pagination-item').removeClass('is-current');

    if (this.maxSlide > 1) {
      newPrev.addClass('is-prev');
      newNext.addClass('is-next');
    }

    newCurrent.addClass('is-current');
    this.$el.find('.js-pagination-item[data-slide="' + this.currentSlide + '"]').addClass('is-current');
  }

  nextSlide() {
    this.preventClick();
    this.goToSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.preventClick();
    this.goToSlide(this.currentSlide - 1);
  }

  startAutoplay() {
    this.interval = setInterval(() => {
      if (!this.isAnimating) {
        this.nextSlide();
      }
    }, this.autoplaySpeed);
  }

  destroy() {
    this.$el.off();
  }

}

(function () {
  let loaded = false;
  let maxLoad = 3000;

  function load() {
    const options = {
      showPagination: true
    };
    let slideShow = new Slideshow(options);
  }

  function addLoadClass() {
    $body.addClass('is-loaded');
    setTimeout(function () {
      $body.addClass('is-animated');
    }, 600);
  }

  $window.on('load', function () {
    if (!loaded) {
      loaded = true;
      load();
    }
  });
  setTimeout(function () {
    if (!loaded) {
      loaded = true;
      load();
    }
  }, maxLoad);
  addLoadClass();
})();


window.onload=function () {
  shoppingCart.clearCart();
  carritoEnTexto = "";
  displayCart();
  fadeOut();
}

function fadeOut() {
  setInterval(loader, 3000);
}

function loader() {
  document.querySelector('.loader-container').classList.add('fade-out');
}

/* sendOrder(); */
popupWhatsApp();