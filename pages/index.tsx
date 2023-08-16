import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <div id="header_wrap">
        <div id="video-wrap" className="a-center">
          <video
            src="https://greenbricks.co.kr/images/211224_greenbricks_4.mp4"
            autoPlay
            muted
            loop
            width="100%"
          ></video>
        </div>
        <div id="about_wrap" className="bg-[#f5f5f5]">
          <div
            id="about_title"
            className="row justify-content-start w-full pl-[120px] pt-[194px]"
          >
            <ul style={{ listStyle: "none" }}>
              <li className="about_pb1 pb-[25px]">
                <Image
                  src="https://greenbricks.co.kr/images/about_title_01.png"
                  alt="about_title_01.png"
                  width={250}
                  height={23}
                />
              </li>
              <li className="about_pb2 pb-[98px]">
                <Image
                  src="https://greenbricks.co.kr/images/about_title_02.png"
                  alt="about_title_02.png"
                  width={639}
                  height={43}
                  className="size"
                />
              </li>
              <li
                className="about_pb3 pb-[137px]"
                style={{
                  fontFamily: "Pretendard-Regular",
                  color: "#000000",
                  fontSize: "17pt",
                }}
              >
                블록의 Base Plate를 생각하고 만든 회사 ‘그린브릭스’는
                <br />
                그 위에 어떤 색깔, 어떤 모양의 블록이든 차곡차곡 신중하게
                쌓아가겠습니다.
                <br />
                작은 블록이 모여 큰 성을 만들 듯. 오늘은 어제보다 한 블록 더
                높이!
              </li>
            </ul>
          </div>

          <div id="about_img" className="row col w-full pb-[194px]">
            <ul
              id="about_img_c"
              className="row justify-content-center flex flex-wrap items-center justify-center"
            >
              <li>
                <Image
                  src="https://greenbricks.co.kr/images/about_01.png"
                  alt="about_01.png"
                  width={233}
                  height={223}
                />
              </li>
              <li>
                <Image
                  width={233}
                  height={223}
                  src="https://greenbricks.co.kr/images/about_02.png"
                  alt="about_02.png"
                />
              </li>
              <li>
                <Image
                  width={233}
                  height={223}
                  src="https://greenbricks.co.kr/images/about_03.png"
                  alt="about_03.png"
                />
              </li>
              <li>
                <Image
                  width={233}
                  height={223}
                  src="https://greenbricks.co.kr/images/about_04.png"
                  alt="about_04.png"
                />
              </li>
              <li>
                <Image
                  src="https://greenbricks.co.kr/images/about_05.png"
                  alt="about_05.png"
                  width={233}
                  height={223}
                />
              </li>
            </ul>
          </div>
        </div>
        <div id="campaign_wrap">
          <div
            id="campaign_title"
            className="a-center flex w-full items-center justify-center pb-[153px] pt-[150px]"
          >
            <Image
              src="https://greenbricks.co.kr/images/campaign_title.png"
              alt="OUR campaignS"
              width={485}
              height={43}
            />
          </div>
          <div className="pl-[126px]">
            <div id="campaign_01SSG_app">
              <ul
                id="campaign"
                className="a-center flex"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_01SSG_app.png"
                    alt="SSG 이마트몰 새벽배송"
                    width={393}
                    height={91}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_01SSG_img">
              <ul
                id="campaign"
                className="a-center flex flex-wrap justify-between"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    textAlign: "left",
                    letterSpacing: "-1px",
                    color: "#000",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "15pt",
                    paddingTop: "43px",
                  }}
                >
                  SSG.COM, 이마트몰, 신세계몰, 새벽배송
                  <br />
                  연간 퍼포먼스 마케팅 메인 에이전시
                  <br />
                  IN APP, WEB 통합 마케팅 플랜 제공
                </li>
                <li className="right">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_01SSG_img.png"
                    alt="campaign_01SSG_img.png"
                    width={1062}
                    height={756}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_02_app">
              <ul
                id="campaign"
                className="a-center flex justify-between"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_02jobkorea_app.png"
                    alt="잡코리아 알바몬"
                    width={192}
                    height={91}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_02_img">
              <ul
                id="campaign"
                className="a-center flex flex-wrap justify-between"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    textAlign: "left",
                    letterSpacing: "-1px",
                    color: "#000",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "15pt",
                    paddingTop: "43px",
                  }}
                >
                  2022년 여름 알바몬 디지털 영상 캠페인 집행 및<br />
                  2023년 In app DA Performance Main Agency 선정!
                </li>
                <li className="right">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_02jobkorea_img1.png"
                    alt="campaign_02jobkorea_img1.png"
                    width={1064}
                    height={1123}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_03_app" className="pt-[160px]">
              <ul
                id="campaign"
                className="a-center flex justify-between"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_03_app.png"
                    alt="초록우산 어린이재단"
                    width={91}
                    height={90}
                  />
                </li>
              </ul>
            </div>

            <div id="campaign_03_img">
              <ul
                id="campaign"
                className="a-center flex flex-wrap justify-between"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    textAlign: "left",
                    letterSpacing: "-1px",
                    color: "#000",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "15pt",
                    paddingTop: "43px",
                  }}
                >
                  국내 최대 아동복지전문기관 초록우산 어린이재단
                  <br />
                  2022년 WEB&amp;APP통합 마케팅 연간대행
                </li>
                <li className="right">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_03_img.png"
                    alt="campaign_03_img.png"
                    width={1138}
                    height={787}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_04_app">
              <ul
                id="campaign"
                className="a-center flex justify-between"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_04_app.png"
                    alt="튠H"
                    width={191}
                    height={91}
                  />
                </li>
              </ul>
            </div>

            <div id="campaign_04_img">
              <ul
                id="campaign"
                className="a-center flex flex-wrap justify-between"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    textAlign: "left",
                    letterSpacing: "-1px",
                    color: "#000",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "15pt",
                    paddingTop: "43px",
                  }}
                >
                  글로벌 50대 그룹 시그나의
                  <br />
                  코리아 헬스케어 플랫폼 TuneH
                  <br />
                  론칭 퍼포먼스 마케팅 연간 대행
                </li>
                <li className="right">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_04_img.png"
                    alt="campaign_04_img.png"
                    width={1076}
                    height={765}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_05_app">
              <ul
                id="campaign"
                className="a-center flex justify-between"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_05_app.png"
                    alt="MS리테일"
                    width={91}
                    height={90}
                  />
                </li>
              </ul>
            </div>

            <div id="campaign_05_img">
              <ul
                id="campaign"
                className="a-center flex flex-wrap justify-between"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    textAlign: "left",
                    letterSpacing: "-1px",
                    color: "#000",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "15pt",
                    paddingTop: "43px",
                  }}
                >
                  강원-춘천 유통/마트 기업 MS홀딩스의 춘천 생활 필수 플랫폼
                  ‘우동착’
                  <br />
                  지역 타겟을 활용하여 캠페인 론칭
                </li>
                <li className="right">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_05_img.png"
                    alt="campaign_05_img.png"
                    width={1064}
                    height={1257}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_06_app" className="pt-[160px]">
              <ul
                id="campaign"
                className="a-center flex justify-between"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_06_app.png"
                    alt="올라케어"
                    width={91}
                    height={91}
                  />
                </li>
              </ul>
            </div>

            <div id="campaign_06_img">
              <ul
                id="campaign"
                className="a-center flex flex-wrap justify-between"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    textAlign: "left",
                    letterSpacing: "-1px",
                    color: "#000",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "15pt",
                    paddingTop: "43px",
                  }}
                >
                  비대면 진료에서 약 배달까지! 올라케어
                  <br />
                  연간 IN APP 퍼포먼스 마케팅 에이전시
                  <br />
                  시장 선점을 위한 마이크로 매니징&전략 제공
                </li>
                <li className="right">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_06_img.png"
                    alt="campaign_06_img.png"
                    width={1073}
                    height={766}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_07_app">
              <ul
                id="campaign"
                className="a-center flex justify-between"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_07_app.png"
                    alt="쓱라이브"
                    width={91}
                    height={90}
                  />
                </li>
              </ul>
            </div>

            <div id="campaign_07_img">
              <ul
                id="campaign"
                className="a-center flex flex-wrap justify-between"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    textAlign: "left",
                    letterSpacing: "-1px",
                    color: "#000",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "15pt",
                    paddingTop: "43px",
                  }}
                >
                  SSG의 라이브 커머스 편성을 고려하여
                  <br />
                  방송혜택을 편성 시간 중 노출하고
                  <br />
                  시청자수 유입과 구매 확보
                </li>
                <li className="right">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_07_img.png"
                    alt="campaign_07_img"
                    width={1064}
                    height={765}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_08_app">
              <ul
                id="campaign"
                className="a-center flex justify-between "
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_08_app.png"
                    alt="좋은데이"
                    width={91}
                    height={91}
                  />
                </li>
              </ul>
            </div>

            <div id="campaign_08_img">
              <ul
                id="campaign"
                className="a-center flex flex-wrap justify-between"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name pb53"
                  style={{
                    textAlign: "left",
                    letterSpacing: "-1px",
                    color: "#000",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "15pt",
                    paddingTop: "43px",
                  }}
                >
                  무학소주의 좋은데이
                  <br />
                  “좋은날이 올거에요, 좋은데이”
                  <br />
                  디지털 캠페인
                </li>
                <li className="right pr110 pb160">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_08_img.png"
                    alt="campaign_08_img.png"
                    width={934}
                    height={471}
                    className="mb-[160px] mr-[110px]"
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_09_app">
              <ul
                id="campaign"
                className="a-center flex justify-between"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_09_app.png"
                    alt="닥터퓨리"
                    width={91}
                    height={91}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_09_img">
              <ul
                id="campaign"
                className="a-center flex flex-wrap justify-between"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name pb53"
                  style={{
                    textAlign: "left",
                    letterSpacing: "-1px",
                    color: "#000",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "15pt",
                    paddingTop: "43px",
                  }}
                >
                  닥터퓨리 영상 디지털 캠페인
                </li>
                <li className="right pr110 pb160">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_09_img.png"
                    alt="campaign_09_img.png"
                    width={1012}
                    height={455}
                    className="mb-[160px] mr-[110px]"
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_10_app">
              <ul
                id="campaign"
                className="a-center flex justify-between"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_10_app.png"
                    alt="말본골프"
                    width={91}
                    height={91}
                  />
                </li>
              </ul>
            </div>

            <div id="campaign_10_img">
              <ul
                id="campaign"
                className="a-center flex flex-wrap justify-between"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name pb53"
                  style={{
                    textAlign: "left",
                    letterSpacing: "-1px",
                    color: "#000",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "15pt",
                    paddingTop: "43px",
                  }}
                >
                  말본골프 영상 디지털 캠페인
                </li>
                <li className="right pr110 pb160">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_10_img.png"
                    alt="campaign_10_img.png"
                    width={1021}
                    height={334}
                    className="mb-[160px] mr-[110px]"
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_11_app">
              <ul
                id="campaign"
                className="a-center flex justify-between"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_11_app.png"
                    alt="디아도라"
                    width={91}
                    height={91}
                  />
                </li>
              </ul>
            </div>

            <div id="campaign_11_img">
              <ul
                id="campaign"
                className="a-center flex flex-wrap justify-between"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name pb53"
                  style={{
                    textAlign: "left",
                    letterSpacing: "-1px",
                    color: "#000",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "15pt",
                    paddingTop: "43px",
                  }}
                >
                  디아도라 영상 디지털 캠페인
                </li>
                <li className="right pr110 pb160">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_11_img.png"
                    alt="campaign_11_img.png"
                    width={1022}
                    height={336}
                    className="mb-[160px] mr-[110px]"
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_12_app">
              <ul
                id="campaign"
                className="a-center flex justify-between"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_12_app.png"
                    alt="코닥어페럴"
                    width={91}
                    height={91}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_12_img">
              <ul
                id="campaign"
                className="a-center flex justify-between"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name pb53 flex-wrap"
                  style={{
                    textAlign: "left",
                    letterSpacing: "-1px",
                    color: "#000",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "15pt",
                    paddingTop: "43px",
                  }}
                >
                  코닥어페럴 영상 디지털 캠페인
                </li>
                <li className="right pr110 pb160">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_12_img.png"
                    alt="campaign_12_img.png"
                    width={1021}
                    height={335}
                    className="mb-[160px] mr-[110px]"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          id="business_wrap"
          style={{
            width: "100%",
            backgroundImage:
              "url(https://greenbricks.co.kr/images/business_bg01.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#f5f5f5",
          }}
        >
          <div id="business_title" className="pl-[204px] pt-[230px]">
            <ul style={{ listStyle: "none" }}>
              <li className="business_bt1 pb-[91px]">
                <Image
                  src="https://greenbricks.co.kr/images/business_title_01.png"
                  alt="business_title_01.png"
                  width={541}
                  height={1026}
                />
              </li>
              <li className="business_bt2 pb-[37px]">
                <Image
                  src="https://greenbricks.co.kr/images/business_title_02.png"
                  alt="business_title_02.png"
                  width={673}
                  height={49}
                />
              </li>
              <li className="business_bt3 pb-[130px]">
                <a
                  href="https://drive.google.com/file/d/1Ps1pfl2zxgcXne2TNNXZHuBf9PpGIx9J/view?usp=share_link"
                  target="_blank"
                >
                  <Image
                    src="https://greenbricks.co.kr/images/business_btn.png"
                    alt="회사소개서"
                    width={205}
                    height={42}
                  />
                </a>
              </li>
            </ul>
          </div>

          <div id="business_img">
            <ul id="business_img_c" className="flex flex-row justify-center">
              <li>
                <Image
                  src="https://greenbricks.co.kr/images/business_01.png"
                  alt="business_01.png"
                  width={240}
                  height={240}
                />
              </li>
              <li>
                <Image
                  src="https://greenbricks.co.kr/images/business_02.png"
                  alt="business_02.png"
                  width={240}
                  height={240}
                />
              </li>
              <li>
                <Image
                  src="https://greenbricks.co.kr/images/business_03.png"
                  alt="business_03.png"
                  width={240}
                  height={240}
                />
              </li>
              <li>
                <Image
                  src="https://greenbricks.co.kr/images/business_04.png"
                  alt="business_04.png"
                  width={240}
                  height={240}
                />
              </li>
              <li>
                <Image
                  src="https://greenbricks.co.kr/images/business_05.png"
                  alt="business_05.png"
                  width={240}
                  height={240}
                />
              </li>
            </ul>
          </div>
          <div
            id="recruit_wrap"
            className="row justify-content-center mx-auto my-0 flex w-[80%] max-w-[1400px] flex-col pt-[230px] xl:flex-row"
          >
            <div id="recruit_img">
              <Image
                src="https://greenbricks.co.kr/images/recruit_img_left.png"
                alt="recruit_img_left.png"
                width={417}
                height={541}
              />
            </div>
            <div id="recruit_title" className="pb-[180px] pl-[180px]">
              <div>
                <Image
                  src="https://greenbricks.co.kr/images/recruit_title01.png"
                  alt="recruit_title01.png"
                  width={408}
                  height={43}
                />
              </div>
              <div
                className="recruit_pt1 pt-[95px]"
                style={{
                  fontFamily: "Pretendard-Regular",
                  color: "#000000",
                  fontSize: "17pt",
                }}
              >
                그린브릭스에서는 구성원마다 새로운 경험을 만들어 가길 바라는
                마음으로 시작했습니다.
                <br />
                일하기 즐거운 회사 그린브릭스에서 함께 블록을 쌓아 주실 여러분을
                기다립니다.
              </div>
              <div className="recruit_pt2 pt-[37px]">
                <a href="mailto:recruit@greenbricks.co.kr" target="_blank">
                  <Image
                    src="https://greenbricks.co.kr/images/recruit_btn.png"
                    alt="입사지원하기버튼"
                    width={205}
                    height={42}
                  />
                </a>
              </div>

              <div id="recruit_box">
                <ul
                  id="recruit"
                  style={{ listStyle: "none", minWidth: "776.14px" }}
                  className="pt-[45px]"
                >
                  <li
                    className="float-left mr-[50px]"
                    style={{
                      fontFamily: "Pretendard-Regular",
                      color: "#000000",
                      fontSize: "12pt",
                      letterSpacing: "-1px",
                    }}
                  >
                    · 탄력근무제 (9시~10시 출근)
                    <br />
                    · 퇴직연금 / 재직자 내일 채움 공제
                    <br />
                    · 각종 경조사 지원
                    <br />
                    · 고사양의 업무용 노트북/PC
                    <br />
                    · 명절 상여금
                    <br />
                    · 연봉 외 연 240만원의 복지비 지급
                    <br />
                    · 1인1법인카드
                    <br />
                    · 웰컴키트 지급
                    <br />
                    · 10주간 온보딩 프로그램 진행
                    <br />· 필요시 재택근무 시행(업무환경지원)
                  </li>
                  <li
                    className="float-left mr-[50px]"
                    style={{
                      fontFamily: "Pretendard-Regular",
                      color: "#000000",
                      fontSize: "12pt",
                      letterSpacing: "-1px",
                    }}
                  >
                    · 한달에 한번 4시간 근무-그린데이
                    <br />
                    · 3년, 5년 만근 유급휴가
                    <br />
                    · 생일자 2시 퇴근 , 생일반차
                    <br />
                    · 월 2회 금요일 1시간 일찍 퇴근
                    <br />
                    - 브릭스데이
                    <br />
                    · 자유로운 연차 사용
                    <br />
                    · 임직원 리조트 회원권 이용 가능
                    <br />· 법인차량 이용 가능 (사전예약)
                  </li>
                  <li
                    className="float-left mr-[50px]"
                    style={{
                      fontFamily: "Pretendard-Regular",
                      color: "#000000",
                      fontSize: "12pt",
                      letterSpacing: "-1px",
                    }}
                  >
                    · 장기 근속자 인센티브
                    <br />
                    · 승진 인센티브
                    <br />
                    · 생일 축하 상품권 10만원
                    <br />
                    · 건물 내 커피숍 제휴-1일 1커피 무료
                    <br />
                    · 스낵바 상시 운영
                    <br />
                    · 업무 관련 강좌, 웨비나 지원
                    <br />· 업무 관련 도서 지원
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="contact_wrap" className="bg-black">
          <div id="contact_title" className="pl-[197px] pt-[230px]">
            <ul style={{ listStyle: "none" }} className="mb-[1rem]">
              <li className="contact_pb1 pb-[91px]">
                <Image
                  src="https://greenbricks.co.kr/images/contact_title01.png"
                  alt="contact_title01.png"
                  width={713}
                  height={43}
                />
              </li>
              <li
                className="contact_pb2"
                style={{
                  fontFamily: "Pretendard-Regular",
                  color: "#FFFFFF",
                  fontSize: "17pt",
                }}
              >
                평균 9년 업력의 퍼포먼스 마케터들이 모였습니다.
                <br />
                클라이언트와 같은 마음으로 고민하고 성과를 낼 수 있는 마케팅
                솔루션을 제안하겠습니다.
              </li>
            </ul>
          </div>

          <div id="contact_box" className="pb-[76px] pl-[197px]">
            <ul
              id="contact"
              style={{ listStyle: "none" }}
              className="flex gap-[50px]"
            >
              <li>
                <a href="mailto:mkt_gb@greenbricks.co.kr" target="_blank">
                  <Image
                    src="https://greenbricks.co.kr/images/contact_btn01.png"
                    alt="이메일문의"
                    width={205}
                    height={42}
                  />
                </a>
              </li>
              <li>
                <a href="tel:0263950525" target="_blank">
                  <Image
                    src="https://greenbricks.co.kr/images/contact_btn02.png"
                    alt="전화문의"
                    width={205}
                    height={42}
                  />
                </a>
              </li>
            </ul>
          </div>

          <div id="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.1565564284147!2d126.8783815156285!3d37.48063177981408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b613ab894f3d7%3A0x9e9ae0d75ac2f089!2z6rCA7IKwV-yEvO2EsA!5e0!3m2!1sko!2skr!4v1639467126277!5m2!1sko!2skr"
              width="100%"
              height="500"
              allowFullScreen
              loading="lazy"
              style={{ border: 0 }}
            ></iframe>
          </div>

          <div
            id="footer"
            className="footer_img px-[197px] py-[30px]"
            style={{
              fontFamily: "Pretendard-Regular",
              color: "#787878",
            }}
          >
            <ul className="text_footer mb-[1rem]">
              <li>서울시 금천구 가산디지털1로 181, 가산더블유센터 1105~06호</li>
              <li>T +82 2 6395 0501</li>
              <li>F +82 2 6395 0528</li>
              <li>대표이사 : 심홍수</li> <br />
              <li>ⓒ 2021 greenbricks Company. All Rights Reserved.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
