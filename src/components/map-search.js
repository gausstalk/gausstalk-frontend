/*
Kakao Javascript Maps SDK for Kakao Open Platform Service
Copyright 2017 Kakao Corp.
Modifications copyright 2022 Gausstalk.
Licensed under the Apache License, Version 2.0 (the “License”);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Input } from '@mui/material';

import '../assets/styles/lunch-together.css';


const MapSearch = ({ setSelectedRestaurantId, setSelectedRestaurantName }) => {
  const { kakao } = window;
  const [map, setMap] = useState(null);
  const [placeButtons, setPlaceButtons] = useState(null);

  // 마커를 담을 배열입니다
  var markers = [];

  // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  // 장소 검색 객체를 생성합니다
  var ps = new kakao.maps.services.Places();

  useEffect(() => {
    kakao.maps.load(() => {
      let el = document.getElementById('map');
      const map = new kakao.maps.Map(el, {
        center: new kakao.maps.LatLng(37.501348139564, 127.037211677362),
        level: 4,
      });
      setMap(map);
    });
  }, [kakao.maps]);

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position, idx) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage
      });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
  }

  function clickRestaurant(place) {
    console.log(place);
    setSelectedRestaurantId(place.id);
    setSelectedRestaurantName(place.place_name);
  }

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다
  function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
  }

  // 검색결과 항목을 Element로 반환하는 함수입니다
  function getListItem(place, marker) {
    let items = [];
    items.push(<p key='place-name'>{place.place_name}</p>);
    if (place.road_address_name) {
      items.push(<p key='place-road-address'>{place.road_address_name}</p>);
    }
    else if (place.address_name) {
      items.push(<p key='place-old-address'>{place.address_name}</p>);
    }
    console.log(items);
    return (
      <Button
        key={place.id}
        onClick={() => clickRestaurant(place)}
        onMouseOver={() => displayInfowindow(marker, place.place_name)}
        onMouseOut={infowindow.close()}
      >
        <ul>
          <li key='place-name'>{place.place_name}</li>
          {place.road_address_name && <li key='place-road-address'>{place.road_address_name}</li>}
          {place.address_name && <li key='place-address'>{place.address_name}</li>}
        </ul>
      </Button>
    );
  }

  function mouseover(marker, title) {
    kakao.maps.event.addListener(marker, 'mouseover', function () {
      displayInfowindow(marker, title);
    });

    kakao.maps.event.addListener(marker, 'mouseout', function () {
      infowindow.close();
    });
  }

  // 검색 결과 목록과 마커를 표출하는 함수입니다
  function displayPlaces(places) {
    var bounds = new kakao.maps.LatLngBounds();
    let tmpPlaceButtons = [];

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    setPlaceButtons([]);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for (var i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
        marker = addMarker(placePosition, i),
        itemEl = getListItem(places[i], marker); // 검색 결과 항목 Element를 생성합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);

      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다
      mouseover(marker, places[i].place_name);

      tmpPlaceButtons.push(itemEl);
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);

    // Show placeButtons when searching.
    console.log(tmpPlaceButtons);
    setPlaceButtons(tmpPlaceButtons);
  }

  // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
  function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
      fragment = document.createDocumentFragment(),
      i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      var el = document.createElement('a');
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.onclick = (function (i) {
          return function () {
            pagination.gotoPage(i);
          }
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      displayPlaces(data);

      // 페이지 번호를 표출합니다
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  }

  function searchPlaces(event) {
    event.preventDefault();
    let keyword = event.target[0].value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB);
  }

  return (
    <div id="map-search">
      <div id="map" />
      <div id="menu-wrap">
        <form onSubmit={searchPlaces} id='search-places'>
          <Input id="keyword" />
          <Button type="submit" variant={"contained"}>Search</Button>
        </form>
        <div id="pagination" />
        <ButtonGroup id="place-list" variant='outlined' orientation='vertical' aria-label="vertical outlined button group">
          {placeButtons}
        </ButtonGroup>
      </div>
    </div>
  );
};


export default MapSearch;
