$(function(){
	// IE 접속 불가 코드
	var agent = navigator.userAgent.toLowerCase();
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	 location.href = "/noie.html";
	}
	else {
	  console.log("it's not IE");
	}
	// 사이트 접속시 타이틀 출력 
	$(".title > h1").animate({
		opacity: 1
	},2000,function(){
		$(this).next().addClass("content-fade1");
		var textFadeTimer = setInterval(textChange, 2000);		
	});

	//메인-타이틀 리스트 페이드 인 앤 아웃 
	function textChange() {
		var eventClass = "title-text-fade";
		var currentTarget = document.querySelector("." + "title-text-fade");
		currentTarget.classList.remove(eventClass);
		var nextTarget = currentTarget.nextElementSibling;
		if(!nextTarget) {
			nextTarget = document.querySelector(".textchange > li:first-child");
		}
		nextTarget.classList.add(eventClass);
	}	
	// 메뉴바,햄버거메뉴 등장.
	var $toggleMenuLine = $(".line");
	$(".hamburger-menu-wrap").on("click",function(){
	    $toggleMenuLine.eq(0).toggleClass("top-line");
	    $toggleMenuLine.eq(1).toggleClass("mid-line");
		$toggleMenuLine.eq(2).toggleClass("bottom-line");
		$(".menu-bar").toggleClass("menu-bar-open");
	});
	
	// 떨어지는 별똥별 효과
	var starNum = 20;
	for(i = 0; i < starNum; i++) {
		$("<div>").css("animation-delay",function(){
			var delay = Math.floor(Math.random() * 10) + 1;
			return delay + "s";
		}).addClass("shootingstar").css("transform","rotate(40deg)")
		.css("left",function(){
			var left = Math.floor(Math.random() * 100) + 1;
			return left + "vw";
		}).appendTo(document.body)
	}
	
	//스크롤 아이콘 클릭시 다음섹션 
	$(".scrolldown-ani").on("click",function(){
		var aboutTop = $(".main-about").position().top + 50;
		$("html,body").animate({
			scrollTop: aboutTop
		},500);
	});
	
	//메뉴 리스트 클릭시 해당 섹션 이동
	$(".menu-bar > ul > li").on("click",function(){
		var sectionTop = [];
		sectionTop.push($(".main-title").position().top);
		sectionTop.push($(".main-about").position().top);
		sectionTop.push($(".main-popol").position().top);
		sectionTop.push($(".main-contact").position().top);
		var listIndex = $(this).index();
		scrollMove(sectionTop[listIndex]);
	});
	
	var scrolling = false;
	function scrollMove(choiceSection) {
		if(scrolling) return;
		scrolling = true;
		$("html,body").stop().animate({
			scrollTop: choiceSection
		});
		scrolling = false;
	}
	
	
	//어바웃 섹션 스텟
	/*$(window).on("scroll",function(){
		var scrY = window.scrollY;
		var aboutTop = $(".main-about").position().top;
		if(aboutTop <= scrY) {
			myStat();
			setInterval(myStat);
		}
	});*/
	myStat();
	function myStat() {
		var stat = [80, 80, 65, 75]
		$(".stat-list > li").each(function(index){
			$(this).children("span:last").one().animate({
				width: stat[index] + "%"
			},{
				duration: 1500,
				progress: function(x, progress, x) {
					var rate = Math.floor(stat[index] * progress);
					$(this).prev().text(rate + "%");
				}
			});
		});
	} 
	
	//어바웃 영역
	scrEffect(".about-title","content-fade1");
	scrEffect(".profile-img","content-fade2");
	scrEffect(".profile-text","content-fade2");
	scrEffect(".about-box-title","content-fade0");
	scrEffect("#about-box1","content-fade2");
	scrEffect("#about-box2","content-fade2");
	scrEffect("#about-box3","content-fade2");
	//포폴영역 
	scrEffect(".popol-title", "content-fade1");
	scrEffect("#popol-content1", "content-fade1");
	scrEffect("#popol-content2", "content-fade1");
	scrEffect("#popol-content3", "content-fade1");
	scrEffect("#popol-content4", "content-fade1");
	scrEffect("#popol-content5", "content-fade1");
	scrEffect(".contact-title", "content-fade1");
	scrEffect(".contact-item > p", "content-fade1");
	scrEffect(".contact-form", "content-fade3");
	
	//스크롤 이펙트 
	function scrEffect(target, addClass, subTarget) {
		var target2Top = target || subTarget;
		var targetTop = $(target2Top).position().top;
		var vh;
		$(window).on("resize",function(){
			vh = innerHeight;
		}).trigger("resize");
		
		$(window).on("scroll",function(){
			var scrY = window.scrollY;
			if(targetTop - (vh / 2) <= scrY && !$(target).hasClass(addClass)) {
				$(target).addClass(addClass);
			}
		});
	}
	
	//폼 이벤트 등록
	$("#btnsend").on("click",formChkSend);	
	$("#subject, #writer, #email, #content").on("keypress",formChkSend);
	
	// 콘택트 input value 검사
	var name = document.querySelector("#writer");
	var email = document.querySelector("#email");
	var message = document.querySelector("#content");
	var title = document.querySelector("#subject");
	function formChkSend(e){
		if(e.type === "keypress"){
			var keyCode = e.which || e.keyCode;
			if(keyCode != 13) return;
		}
		 if (!title.value) {
			title.classList.add("formchk");
			title.setAttribute("placeholder","문의하실 제목을 입력해주세요.");
			title.focus();
			setTimeout(function(){
				title.classList.remove("formchk");
			},1000);
			return false;
		} else if(!name.value) {
			name.classList.add("formchk");
			name.setAttribute("placeholder","이름을 입력해주세요.");
			name.focus();
			setTimeout(function(){
				name.classList.remove("formchk");
			},1000);
			return false;
		} else if (!email.value) {
			email.classList.add("formchk");
			email.setAttribute("placeholder","이메일을 입력해주세요.");
			email.focus();
			setTimeout(function(){
				email.classList.remove("formchk");
			},1000);
			return false;
		} else if (!message.value) {
			message.classList.add("formchk");
			message.setAttribute("placeholder","보내실 내용을 입력해주세요.");
			message.focus();
			setTimeout(function(){
				message.classList.remove("formchk");
			},1000);
			return false;
		}
		
		//이메일 유효성 검증
		var emailRegexp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
		var emailVal = $("#email").val();
		var valid = true;
		if(valid && !emailVal.match(emailRegexp)) {
			email.classList.add("formchk");
			$("#noEmail").text("올바른 이메일 형식이 아닙니다.")
			email.focus();
			valid = false;
			setTimeout(function(){
				email.classList.remove("formchk");
				$("#noEmail").text(" ");
			},2000);			
			return valid;
		}
			$.post("/mypogal/_process/index.php", {
				subject: $("#subject").val(),	
				writer: $("#writer").val(),
				email: $("#email").val(),
				content: $("#content").val(),
				process: $("#process").val(),
				act: $("#act").val()
			},function(response){
				if(response == "OK") {
					var $sendpopup = $(".sendpopup");
					$(".required").val("").attr("placeholder","");
					$sendpopup.show().animate({
						opacity: 1
					},100).addClass("sendpopup-fadein");
					setTimeout(function(){
						$sendpopup.removeClass("sendpopup-fadein").animate({
							opacity: 0
						},500,function(){
							setTimeout(function(){
								$sendpopup.hide();
								title.focus();
							},500);
						});
					},2500);
				}
			});		
	}	
});