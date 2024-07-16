import PropTypes from 'prop-types'; // PropTypes 불러오기
import { useEffect } from 'react';

export default function Map({ 
  style 
}) {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);

    script.onload = () => {
      // Kakao Maps API가 로드된 후 실행될 함수
      const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = { 
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 10 // 지도의 확대 레벨
      }; 

      const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      if (navigator.geolocation) {
        // Geolocation API를 지원하는지 확인
        navigator.geolocation.getCurrentPosition((position) => {
          console.log('위도:', position.coords.latitude) // 위도
          console.log('경도:', position.coords.longitude) // 경도
          const {latitude, longitude} = position.coords

          // Kakao Maps API 초기화
          const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
          const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude), // 현재 위치를 중심으로 지도를 설정
            level: 3 // 지도의 확대 레벨
          };
          const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
          
          // 현재 위치를 마커로 표시
            const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
            const marker = new window.kakao.maps.Marker({
              position: markerPosition
            });
            marker.setMap(map);
        }, (error) => {
          console.error('현재위치 에러', error);
        }
      );
        
      } else {
        console.error('Geolocation이 지원되지 않습니다.');
      }
    };

  }, []); // 빈 의존성 배열은 이 효과가 마운트될 때 한 번만 실행되도록 합니다.

  return (
    <div id="map" style={style}></div>
  );
}
