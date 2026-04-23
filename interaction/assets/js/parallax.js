(() => {
	let yOffset = 0; 
	let prevScrollHeight = 0;	
	let currentScene = 0;
	let enterNewScene = false;
	let acc = 0.2;
	let delayedYOffset = 0;
	let rafId;
	let rafState;

	const sceneInfo = [
		{
			//section0
			type:'normal', 
			heightNum:1,
			scrollHeight:0,
			objs:{ 
				container : document.querySelector('.section0'),
			},
			values:{
			}
		},
		{
			//section1
			type:'sticky',
			heightNum:12,
			scrollHeight:0,
			objs:{
				container : document.querySelector('.section1'),
				content : document.querySelector('.section1 .scroll__content'),
				bgImg : document.querySelector('.section1 .scroll__bg'),
				msgA : document.querySelector('.section1 .msgA'),
				msgB : document.querySelector('.section1 .msgB'),
			},
			values:{
				bgImg: [100, 20, {start:0.1, end:0.3}],
				circle: [50, 0, {start:0.1, end:0.3}],
				msgA_opacity_in: [0,1, {start:0.1, end:0.25}],
				msgA_opacity_out: [1,0, {start:0.35, end:0.5}], 
				msgA_translateY_in: [20, 0, {start:0.1, end:0.25}],
				msgA_translateY_out: [0, -20, {start:0.35, end:0.5}],
				msgB_opacity_in: [0,1, {start:0.55, end:0.7}], 
				msgB_opacity_out: [1,0, {start:0.8, end:0.9}], 
				msgB_translateY_in: [20, 0, {start:0.55, end:0.7}],
				msgB_translateY_out: [0, -20, {start:0.8, end:0.9}],
			}
		},
		{ 
			//section2
			type:'sticky',
			heightNum:4,
			scrollHeight:0,
			objs:{
				container : document.querySelector('.section2'),
				sticky : document.querySelector('.section2 .is-sticky'),
				imgCon : document.querySelector(".section2 .img__content.pc"),
				imgCon2 : document.querySelector(".section2 .img__content.mo"),
				imgArea : document.querySelector(".section2 .is-scroll"),
				imgA : document.querySelector(".section2 .imgArea__bg"),
				imgB : document.querySelector(".section2 .imgArea__bg .img__leftArea"),
				imgC : document.querySelector(".section2 .img__after img"),
				imgD : document.querySelector(".section2 .img__after"),
				imgText : document.querySelector(".section2 .imgArea__bg .img__message"),
				imgText2 : document.querySelector(".section2 .img__content.mo .img__message"),
			},
			values: {
				imgCon_opacity: [0, 1, {start:0.05, end:0.15}],
				imgCon2_opacity: [0, 1, {start:0, end:0.2}],
				imgA_clip: [0, 100, {start:0.25, end:0.7}],
				imgD_height: [0, 100, {start:0.1, end:0.4}],
				imgD_translate: [0, 300, {start:0.45, end:0.65}],
				imgText_opacity: [0, 1, {start:0.35, end:0.55}],
				imgText_transition: [-30, -50, {start:0.35, end:0.55}],
				imgText2_opacity: [0, 1, {start:0.55, end:0.65}],
				imgText2_transition: [-30, -50, {start:0.55, end:0.65}],
				title3_opacity: [0, 1, {start:0.85, end:1}],
				title3_transition: [20, 0, {start:0.85, end:1}],
				title3_opacity_mo: [0, 1, {start:0.75, end:0.9}],
				title3_transition_mo: [20, 0, {start:0.75, end:0.9}],
				imgB_left: [0, 160,{start:0.7, end:0.9}],
				imgText_left: [0, 160,{start:0.7, end:0.9}],
			},
		},
		{
			//section3
			type:'sticky',			
      heightNum:5,
			scrollHeight:0,
			objs:{
				container : document.querySelector('.section3'),
				sticky : document.querySelector('.section3 .is-sticky'),
				msgA : document.querySelector('.section3 .msgA'),
				msgB : document.querySelector('.section3 .msgB'),
				img : document.querySelector('.section3 .sequence__img'),
			},
			values:{
				msgA_opacity_in: [0,1, {start:0.1, end:0.25}],
				msgA_opacity_out: [1,0, {start:0.35, end:0.5}], 
				msgA_translateY_in: [10, 0, {start:0.1, end:0.25}],
				msgA_translateY_out: [0, -10, {start:0.35, end:0.5}],
				msgB_opacity_in: [0,1, {start:0.55, end:0.75}], 
				msgB_opacity_out: [1,0, {start:0.8, end:0.9}], 
				msgB_translateY_in: [10, 0, {start:0.55, end:0.75}],
				msgB_translateY_out: [0, -10, {start:0.8, end:0.9}],
				img_opacity_in: [0,1, {start:0, end:0.2}],
				imageSequence:[1,57],
				//section4 banner
				bannerTrans : [0, -100, {start:0.8, end:1}],
			}
		},
		{
			//section4
			type:'normal', 
			heightNum:1,
			scrollHeight:0,
			objs:{ 
				container : document.querySelector('.section4'),
				sticky : document.querySelector('.section4 .is-sticky'),
				banner : document.querySelector('.section4 .bannerArea__roller'),
			},
			values:{
				bannerTrans : [-50, 0, {start:0, end:1}],
			}
		},
		{
			//section5
			type:'normal',
			heightNum:0,
			scrollHeight:0,
			objs:{
				container : document.querySelector('.floatingArea'),
			},
			values: {
				
			},
		}
	]


	function playAnimation(){
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight; 
		const scrollHeight = sceneInfo[currentScene].scrollHeight; 
		const scrollRatio = currentYOffset / scrollHeight; 

		//전체 스크롤 애니메이션 (플로팅 버튼 텍스트 애니메이션)
		function scrollRotate() {
			const beta = document.getElementsByClassName("beta__imgText");
			beta[0].style.transform = "translate3d(-50%, -50%, 0) rotate("+ window.pageYOffset /  document.body.scrollHeight * 360 + "deg) scale3d(1, 1, 1)"
		}
			
		scrollRotate();
		
		switch(currentScene){
			case 0: //section0

      sceneInfo[0].objs.container.classList.add('on');
 
			break;
			case 1: //section1

        // 애니메이션 재생 및 일시정지
        if(scrollRatio <= 0){
          sceneInfo[0].objs.container.classList.add('on');
        }else{
          sceneInfo[0].objs.container.classList.remove('on');
        }

        //spotlight 애니메이션 효과
        if(scrollRatio <= 0){
          objs.bgImg.style.clipPath=`circle(${calcValues(values.bgImg, currentYOffset)}%)`;
        }else{
          objs.bgImg.style.clipPath=`circle(${calcValues(values.bgImg, currentYOffset)}%)`;
        }

        //msgA 애니메이션 효과
        if(scrollRatio <= 0.25){
          //in
          objs.msgA.style.opacity = calcValues(values.msgA_opacity_in, currentYOffset);
          objs.msgA.style.transform = `translate3d(-50%,${calcValues(values.msgA_translateY_in, currentYOffset)}%,0)`;
        }else{
          //out
          objs.msgA.style.opacity = calcValues(values.msgA_opacity_out, currentYOffset);
          objs.msgA.style.transform = `translate3d(-50%,${calcValues(values.msgA_translateY_out, currentYOffset)}%,0)`;
        }
      
        //msgB 애니메이션 효과
        if(scrollRatio <= 0.7){
          //in
          objs.msgB.style.opacity = calcValues(values.msgB_opacity_in, currentYOffset);
          objs.msgB.style.transform = `translate3d(-50%,${calcValues(values.msgB_translateY_in, currentYOffset)}%,0)`;
        }else{
          //out
          objs.msgB.style.opacity = calcValues(values.msgB_opacity_out, currentYOffset);
          objs.msgB.style.transform = `translate3d(-50%,${calcValues(values.msgB_translateY_out, currentYOffset)}%,0)`;
        }
			break;
      case 2: //section2
        //opacity 세팅
        objs.imgCon.style.opacity = calcValues(values.imgCon_opacity, currentYOffset);
        objs.sticky.style.position ="sticky";
        objs.sticky.style.transition = "0.3s all"
        objs.imgA.style.clip = `rect(0, 0vw, 100vh, 0)`; 
        objs.container.style.background = "transparent";
      

        //이미지 변환 애니메이션
        if(scrollRatio >= 0.2){
          objs.imgA.style.clip = `rect(0, ${calcValues(values.imgA_clip, currentYOffset)}vw, 100vh, 0)`; 
        } 

        if(scrollRatio >= 0.35){
          objs.imgText.style.opacity = calcValues(values.imgText_opacity, currentYOffset);
          objs.imgText.style.transform = `translate3d(-50%, ${calcValues(values.imgText_transition, currentYOffset)}%, 0)`;
        } 

        if(scrollRatio >= 0.6){
          objs.imgB.style.left = `${calcValues(values.imgB_left, currentYOffset)}%`
        }
        if(scrollRatio >= 0.9){
          objs.sticky.style.position = "sticky";
          objs.sticky.style.position ="relative";
          objs.container.style.background = "black";
        } 

        //모바일
        if(window.innerWidth < 768){
          //section1 비디오 고정 해제
          objs.container.style.position="relative"

          objs.imgText2.style.opacity = "0";

          objs.imgCon2.style.opacity = calcValues(values.imgCon2_opacity, currentYOffset);

          objs.imgC.style.transform = `translateY(0%)`; 

          if(scrollRatio >= 0.1){
            objs.imgD.style.height = `${calcValues(values.imgD_height, currentYOffset)}%`; 
          } 
          if(scrollRatio > 0.4){
            objs.imgC.style.transform = `translateY(-${calcValues(values.imgD_translate, currentYOffset)}%)`; 
          } 

          if(scrollRatio >= 0.5){
            objs.sticky.style.position = "sticky";
            objs.imgText2.style.opacity = calcValues(values.imgText2_opacity, currentYOffset);
            objs.imgText2.style.transform =  `translate3d(0, ${calcValues(values.imgText2_transition, currentYOffset)}%, 0)`;
          } 
          if(scrollRatio >= 0.7){
            objs.sticky.style.position = "sticky";
          } 
        }
        sceneInfo[3].objs.sticky.style.position = "sticky";
      break;
      case 3: //section3
			  // 시퀀스 이미지 처리
				let frame = Math.round(
					calcValues(values.imageSequence, currentYOffset)
				);
				if(frame < values.imageSequence[0]) return values.imageSequence[0];
				if(frame > values.imageSequence[1]) return values.imageSequence[1];

				objs.img.src = `assets/img/video_img/LOOPY-${frame}.png`;
        objs.sticky.style.position = "sticky";

        //msgA 애니메이션 효과
        if(scrollRatio >= 0){
          objs.sticky.style.position = "fixed";}
        if(scrollRatio <= 0.25){
          //in
          objs.img.style.opacity = calcValues(values.img_opacity_in, currentYOffset);
          objs.msgA.style.opacity = calcValues(values.msgA_opacity_in, currentYOffset);
          objs.msgA.style.transform = `translate3d(-50%,${calcValues(values.msgA_translateY_in, currentYOffset)}%,0)`;
        }else{
          //out
          objs.msgA.style.opacity = calcValues(values.msgA_opacity_out, currentYOffset);
          objs.msgA.style.transform = `translate3d(-50%,${calcValues(values.msgA_translateY_out, currentYOffset)}%,0)`;
        }
      
        //msgB 애니메이션 효과
        if(scrollRatio <= 0.75){
          //in
          objs.msgB.style.opacity = calcValues(values.msgB_opacity_in, currentYOffset);
          objs.msgB.style.transform = `translate3d(-50%,${calcValues(values.msgB_translateY_in, currentYOffset)}%,0)`;
        }else{
          //out
          objs.msgB.style.opacity = calcValues(values.msgB_opacity_out, currentYOffset);
          objs.msgB.style.transform = `translate3d(-50%,${calcValues(values.msgB_translateY_out, currentYOffset)}%,0)`;
        }

        if(scrollRatio <= 1){
          sceneInfo[4].objs.banner.style.transform = `translateX(${calcValues(values.bannerTrans, currentYOffset)}%)`;
        }

      break;
      case 4: //section4
        sceneInfo[3].objs.sticky.style.position = "sticky";
				//banner
				if(scrollRatio <= 0){
        // objs.sticky.style.position = "sticky";
					objs.banner.style.transform = `translateX(${calcValues(values.bannerTrans, currentYOffset)}%)`;
				}
      break;
      case 5:
      break;
		}
	}


	/******** 공통 스크립트 부분에서 캔버스에서만 추가하는 부분 있음 ***********/

	// 인터렉션 공통 스크립트 부분//

	function setLayout(){
		for(let i=0; i<sceneInfo.length; i++){
			if(sceneInfo[i].type === 'sticky'){
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			} else if(sceneInfo[i].type === 'normal'){
				sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
			}
			sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
		}

		yOffset = window.pageYOffset;
		let totalScrollHeight = 0;
		for(let i=0; i<sceneInfo.length; i++){ 
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if(totalScrollHeight >= yOffset){ 
				currentScene = i;
				
				break;
			}
		}

		document.body.setAttribute('class', `is-show__section${currentScene}`);
	}

	function calcValues(values, currentYOffset){
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;

		if(values.length === 3){ 
			const partScrollStart = values[2].start * scrollHeight; 
			const partScrollEnd = values[2].end * scrollHeight; 
			const partScrollHeight = partScrollEnd - partScrollStart;	

			if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd ){ 
				rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0]; 
			} else if(currentYOffset < partScrollStart){ 
				rv = values[0];
			} else if(currentYOffset > partScrollEnd){
				rv = values[1];
			}
		
		}else{
			rv = scrollRatio * (values[1] - values[0]) + values[0]; 
		}
		return rv;
	}

	function scrollLoop() {
		enterNewScene = false;
		prevScrollHeight = 0; 
			for (let i = 0; i < currentScene; i++) {
				prevScrollHeight += sceneInfo[i].scrollHeight; 
			}
		
		if (delayedYOffset < prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
		//	document.body.classList.remove('scroll-effect-end');
		}

		if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			enterNewScene = true;
			if (currentScene === sceneInfo.length - 1) {
			//	document.body.classList.add('scroll-effect-end');
			}
			if (currentScene < sceneInfo.length - 1) {
				currentScene++;
			}
			document.body.setAttribute('class', `is-show__section${currentScene}`);
		}

		if (delayedYOffset < prevScrollHeight) {
			enterNewScene = true;
			if (currentScene === 0) return;
			currentScene--;
			document.body.setAttribute('class', `is-show__section${currentScene}`);
		}

		if (enterNewScene) return;

		playAnimation();
	}

	function loop() {
		delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

		if (!enterNewScene) {
			// 이미지 시퀀스 비디오가 포함된 씬만 처리
			if (currentScene === 0) {
				const currentYOffset = delayedYOffset - prevScrollHeight;
				const objs = sceneInfo[currentScene].objs;
				const values = sceneInfo[currentScene].values;
			}
		}

    // 일부 기기에서 페이지 끝으로 고속 이동하면 body id가 제대로 인식 안되는 경우를 해결
    // 페이지 맨 위로 갈 경우: scrollLoop와 첫 scene의 기본 캔버스 그리기 수행
    if (delayedYOffset < 1) {
      scrollLoop();
    }

		if ((document.body.offsetHeight - window.innerHeight) - delayedYOffset < 1) {
		    let tempYOffset = yOffset;
		    scrollTo(0, tempYOffset - 1);
		}

		rafId = requestAnimationFrame(loop);

		if (Math.abs(yOffset - delayedYOffset) < 1) {
			cancelAnimationFrame(rafId);
			rafState = false;
		}
	}

	window.addEventListener('load', () => {
		setLayout(); 

		let tempYOffset = yOffset;
		let tempScrollCount = 0;
		if (tempYOffset > 0) {
				let siId = setInterval(() => {
						scrollTo(0, 0);
						tempYOffset += 5;

						if (tempScrollCount > 20) {
								clearInterval(siId);
						}
						tempScrollCount++;
				}, 20);
			}
			document.body.classList.remove('before-load');

			setLayout();

       window.addEventListener('scroll', () => {
				yOffset = window.pageYOffset; 
				scrollLoop();

  			if (!rafState) {
  				rafId = requestAnimationFrame(loop);
  				rafState = true;
  			}
  		});

  		window.addEventListener('orientationchange', () => {
			scrollTo(0, 0);
			setTimeout(() => {
				window.location.reload();
			}, 500);
  		});
	});
})();