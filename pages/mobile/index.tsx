import type { NextPage } from "next";
import Image from "next/image";
const Mobile: NextPage = () => {
  return (
    <>
      <div id="header_wrap">
        <div id="video-wrap" className="a-center">
          <video
            src="https://greenbricks.co.kr/mobile/images/220111_greenbricks_MO.mp4"
            autoPlay
            muted
            loop
            playsInline
            width="100%"
            height="1920px"
          ></video>
        </div>

        <div id="about_wrap" className="bg-[#f5f5f5]">
          <div id="about_title" className="pt-[120px]">
            <ul
              id="about_title_c"
              style={{ listStyle: "none", width: "90%", margin: "0 auto" }}
            >
              <li
                className="about_pb1 pb-[0.5rem]"
                style={{
                  textAlign: "center",
                  fontFamily: "Pretendard-Regular",
                  color: "#17d492",
                  fontSize: "1.5rem",
                }}
              >
                우리는 그린브릭스입니다.
              </li>
              <li className="about_pb2 pb-[2.5rem]">
                <Image
                  src="https://greenbricks.co.kr/images/about_title_02.png"
                  alt="about_title_02.png"
                  width={957}
                  height={64}
                />
              </li>
              <li
                className="about_pb3 pb-[4rem]"
                style={{
                  textAlign: "left",
                  fontFamily: "Pretendard-Regular",
                  color: "#000000",
                  fontSize: "1.4rem",
                  lineHeight: "1.8rem",
                }}
              >
                블록의 Base Plate를 생각하고 만든 회사
                <br />
                ‘그린브릭스’는 그 위에 어떤 색깔, 어떤 모양의 블록이든 차곡차곡
                신중하게 쌓아가겠습니다.
                <br />
                작은 블록이 모여 큰 성을 만들 듯. 오늘은 어제보다 한 블록 더
                높이!
              </li>
            </ul>
          </div>

          <div id="about_img" className="pb-[6rem]">
            <ul
              id="about_img_c"
              className="a-center text-center"
              style={{ listStyle: "none" }}
            >
              <li className="inline-block w-1/3">
                <Image
                  src="https://greenbricks.co.kr/images/about_01.png"
                  alt="about_01.png"
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "inline-block",
                  }}
                  width={300}
                  height={300}
                />
              </li>
              <li className="inline-block w-1/3">
                <Image
                  src="https://greenbricks.co.kr/images/about_02.png"
                  alt="about_02.png"
                  sizes="100%"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "inline-block",
                  }}
                  width={300}
                  height={300}
                />
              </li>
              <li className="inline-block w-1/3">
                <Image
                  src="https://greenbricks.co.kr/images/about_03.png"
                  alt="about_03.png"
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "inline-block",
                  }}
                  width={300}
                  height={300}
                />
              </li>
              <li className="inline-block w-1/3">
                <Image
                  src="https://greenbricks.co.kr/images/about_04.png"
                  alt="about_04.png"
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "inline-block",
                  }}
                  width={300}
                  height={300}
                />
              </li>
              <li className="inline-block w-1/3">
                <Image
                  src="https://greenbricks.co.kr/images/about_05.png"
                  alt="about_05.png"
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "inline-block",
                  }}
                  width={300}
                  height={300}
                />
              </li>
            </ul>
          </div>
        </div>

        <div id="campaign_wrap">
          <div id="campaign_title" className="a-center py-[8rem] text-center">
            <Image
              src="https://greenbricks.co.kr/images/campaign_title.png"
              alt="OUR campaigns"
              sizes="100vw"
              style={{
                width: "80%",
                margin: "0 auto",
                height: "auto",
                display: "inline-block",
              }}
              width={726}
              height={64}
            />
          </div>
          <div className="pl-[2rem]">
            <div id="campaign_01SSG_app">
              <ul
                id="campaign"
                className="a-center"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_01SSG_app.png"
                    alt="SSG 이마트몰 새벽배송 신세계몰 "
                    sizes="100vw"
                    style={{
                      width: "50%",
                    }}
                    width={391}
                    height={91}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_01SSG_img">
              <ul
                id="campaign"
                className="a-center"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    paddingTop: "1.2rem",
                    textAlign: "left",
                    letterSpacing: "-0.5px",
                    fontFamily: "Pretendard-Regular",
                    color: "#000000",
                    fontSize: "0.9rem",
                    lineHeight: "1.4rem",
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
                    height={765}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_02_app" className="pt-16">
              <ul
                id="campaign"
                className="a-center pt-16"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_02jobkorea_app.png"
                    alt="잡코리아 알바몬"
                    sizes="100vw"
                    style={{
                      width: "25%",
                    }}
                    width={91}
                    height={91}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_02_img">
              <ul
                id="campaign"
                className="a-center"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    paddingTop: "1.2rem",
                    textAlign: "left",
                    letterSpacing: "-0.5px",
                    fontFamily: "Pretendard-Regular",
                    color: "#000000",
                    fontSize: "0.9rem",
                    lineHeight: "1.4rem",
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
            <div id="campaign_03_app" className="pt-16">
              <ul
                id="campaign"
                className="a-center pt-16"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_03_app.png"
                    alt="초록우산 어린이재단"
                    sizes="100vw"
                    style={{
                      width: "13%",
                    }}
                    width={44}
                    height={44}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_03_img">
              <ul
                id="campaign"
                className="a-center"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    paddingTop: "1.2rem",
                    textAlign: "left",
                    letterSpacing: "-0.5px",
                    fontFamily: "Pretendard-Regular",
                    color: "#000000",
                    fontSize: "0.9rem",
                    lineHeight: "1.4rem",
                  }}
                >
                  국내 최대 아동복지전문기관 초록우산 어린이재단
                  <br />
                  2022년 WEB&amp;APP통합 마케팅 연간대행
                </li>
                <li className="right">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_03_img.png"
                    alt=""
                    width={1138}
                    height={787}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_04_app" className="pt-16">
              <ul
                id="campaign"
                className="a-center pt-16"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_04_app.png"
                    alt="튠H"
                    sizes="100vw"
                    style={{
                      width: "25%",
                    }}
                    width={91}
                    height={91}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_04_img">
              <ul
                id="campaign"
                className="a-center"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    paddingTop: "1.2rem",
                    textAlign: "left",
                    letterSpacing: "-0.5px",
                    fontFamily: "Pretendard-Regular",
                    color: "#000000",
                    fontSize: "0.9rem",
                    lineHeight: "1.4rem",
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
                className="a-center pt-16"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_05_app.png"
                    alt="MS리테일"
                    sizes="100vw"
                    style={{
                      width: "13%",
                    }}
                    width={44}
                    height={44}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_05_img">
              <ul
                id="campaign"
                className="a-center"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    paddingTop: "1.2rem",
                    textAlign: "left",
                    letterSpacing: "-0.5px",
                    fontFamily: "Pretendard-Regular",
                    color: "#000000",
                    fontSize: "0.9rem",
                    lineHeight: "1.4rem",
                  }}
                >
                  강원-춘천 유통/마트 기업
                  <br />
                  MS홀딩스의 춘천 생활 필수 플랫폼 ‘우동착’
                  <br />
                  지역 타겟을 활용하여 캠페인 론칭
                </li>
                <li className="right">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_05_img.png"
                    alt=""
                    width={900}
                    height={1063}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_06_app" className="pt-16">
              <ul
                id="campaign"
                className="a-center pt-16"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_06_app.png"
                    alt="올라케어"
                    sizes="100vw"
                    style={{
                      width: "13%",
                    }}
                    width={44}
                    height={44}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_06_img">
              <ul
                id="campaign"
                className="a-center"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    paddingTop: "1.2rem",
                    textAlign: "left",
                    letterSpacing: "-0.5px",
                    fontFamily: "Pretendard-Regular",
                    color: "#000000",
                    fontSize: "0.9rem",
                    lineHeight: "1.4rem",
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
                className="a-center pt-16"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_07_app.png"
                    alt="쓱라이브"
                    sizes="100vw"
                    style={{
                      width: "13%",
                    }}
                    width={44}
                    height={44}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_07_img">
              <ul
                id="campaign"
                className="a-center"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name"
                  style={{
                    paddingTop: "1.2rem",
                    textAlign: "left",
                    letterSpacing: "-0.5px",
                    fontFamily: "Pretendard-Regular",
                    color: "#000000",
                    fontSize: "0.9rem",
                    lineHeight: "1.4rem",
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
                    alt="campaign_07_img.png"
                    width={1064}
                    height={765}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_08_app">
              <ul
                id="campaign"
                className="a-center pt-16"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_08_app.png"
                    alt="좋은데이"
                    sizes="100vw"
                    style={{
                      width: "13%",
                    }}
                    width={44}
                    height={44}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_08_img">
              <ul
                id="campaign"
                className="a-center"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name pb53"
                  style={{
                    paddingTop: "1.2rem",
                    paddingBottom: "1.2rem",
                    textAlign: "left",
                    letterSpacing: "-0.5px",
                    fontFamily: "Pretendard-Regular",
                    color: "#000000",
                    fontSize: "0.9rem",
                    lineHeight: "1.4rem",
                  }}
                >
                  무학소주의 좋은데이
                  <br />
                  “좋은날이 올거에요, 좋은데이”
                  <br />
                  디지털 캠페인
                </li>
                <li className="right pb-16 pr-8">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_08_img.png"
                    alt="campaign_08_img.png"
                    width={934}
                    height={471}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_09_app">
              <ul
                id="campaign"
                className="a-center pt-16"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_09_app.png"
                    alt="닥터퓨리"
                    sizes="100vw"
                    style={{
                      width: "13%",
                    }}
                    width={44}
                    height={44}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_09_img">
              <ul
                id="campaign"
                className="a-center"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name pb53"
                  style={{
                    paddingTop: "1.2rem",
                    paddingBottom: "1.2rem",
                    textAlign: "left",
                    letterSpacing: "-0.5px",
                    fontFamily: "Pretendard-Regular",
                    color: "#000000",
                    fontSize: "0.9rem",
                    lineHeight: "1.4rem",
                  }}
                >
                  닥터퓨리 영상 디지털 캠페인
                </li>
                <li className="right pb-16 pr-8">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_09_img.png"
                    alt="campaign_09_img.png"
                    width={1012}
                    height={455}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_10_app">
              <ul
                id="campaign"
                className="a-center pt-16"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_10_app.png"
                    alt="말본골프"
                    sizes="100vw"
                    style={{
                      width: "13%",
                    }}
                    width={44}
                    height={44}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_10_img">
              <ul
                id="campaign"
                className="a-center"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name pb53"
                  style={{
                    paddingTop: "1.2rem",
                    paddingBottom: "1.2rem",
                    textAlign: "left",
                    letterSpacing: "-0.5px",
                    fontFamily: "Pretendard-Regular",
                    color: "#000000",
                    fontSize: "0.9rem",
                    lineHeight: "1.4rem",
                  }}
                >
                  말본골프 영상 디지털 캠페인
                </li>
                <li className="right pb-16 pr-8">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_10_img.png"
                    alt="campaign_10_img.png"
                    width={1021}
                    height={334}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_11_app">
              <ul
                id="campaign"
                className="a-center pt-16"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_11_app.png"
                    alt="디아도라"
                    sizes="100vw"
                    style={{
                      width: "13%",
                    }}
                    width={44}
                    height={44}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_11_img">
              <ul
                id="campaign"
                className="a-center"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name pb53"
                  style={{
                    paddingTop: "1.2rem",
                    textAlign: "left",
                    letterSpacing: "-0.5px",
                    fontFamily: "Pretendard-Regular",
                    color: "#000000",
                    fontSize: "0.9rem",
                    lineHeight: "1.4rem",
                  }}
                >
                  디아도라 영상 디지털 캠페인
                </li>
                <li className="right pb-16 pr-8">
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_11_img.png"
                    alt="campaign_11_img.png"
                    width={1022}
                    height={336}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_12_app">
              <ul
                id="campaign"
                className="a-center pt-16"
                style={{ listStyle: "none" }}
              >
                <li>
                  <Image
                    src="https://greenbricks.co.kr/images/campaign_12_app.png"
                    alt="코닥어페럴"
                    sizes="100vw"
                    style={{
                      width: "13%",
                    }}
                    width={44}
                    height={44}
                  />
                </li>
              </ul>
            </div>
            <div id="campaign_12_img">
              <ul
                id="campaign"
                className="a-center"
                style={{ listStyle: "none" }}
              >
                <li
                  className="campaign_name pb53"
                  style={{
                    paddingTop: "1.2rem",
                    textAlign: "left",
                    letterSpacing: "-0.5px",
                    fontFamily: "Pretendard-Regular",
                    color: "#000000",
                    fontSize: "0.9rem",
                    lineHeight: "1.4rem",
                  }}
                >
                  코닥어페럴 영상 디지털 캠페인
                </li>
                <li className="right pb-16 pr-8">
                  <Image
                    className="object-contain"
                    src="https://greenbricks.co.kr/images/campaign_12_img.png"
                    alt="campaign_12_img.png"
                    width={1021}
                    height={335}
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
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            background: "#000",
          }}
        >
          <div id="business_title" className="pt-28">
            <ul
              id="business_title_c"
              style={{ listStyle: "none", width: "90%", margin: "0 auto" }}
            >
              <li className="business_bt1  pb-16">
                <Image
                  src="https://greenbricks.co.kr/images/business_title_01.png"
                  alt="business_title_01.png"
                  width={882}
                  height={84}
                />
              </li>
              <li
                className="business_bt2"
                style={{
                  paddingBottom: "37px",
                  fontFamily: "Pretendard-Regular",
                  color: "#FFFFFF",
                  fontSize: "1.4rem",
                  lineHeight: "1.8rem",
                }}
              >
                그린브릭스는 디지털 마케팅에서부터 인 앱, 인사이트 도출,
                크리에이티브 제작까지.
                <br />
                다양한 레퍼런스를 갖춘 전문가들이 촘촘하게 설계하여 수행합니다.
              </li>
              <li className="business_bt3 pb-16 pt-8">
                <a
                  href="https://drive.google.com/file/d/1Ps1pfl2zxgcXne2TNNXZHuBf9PpGIx9J/view?usp=share_link"
                  target="_blank"
                >
                  <Image
                    src="https://greenbricks.co.kr/images/business_btn.png"
                    alt="회사소개서 "
                    width={409}
                    height={83}
                    sizes="100vw"
                    style={{
                      width: "45%",
                      margin: "0 auto",
                    }}
                  />
                </a>
              </li>
            </ul>
          </div>

          <div id="business_img">
            <ul id="business_img_c" className="a-center pb300 text-center">
              <li className="inline-block w-1/3">
                <Image
                  src="https://greenbricks.co.kr/images/business_01.png"
                  alt="business_01.png"
                  data-fixed-width="300"
                  width={300}
                  height={300}
                  sizes="100vw"
                  style={{
                    width: "100%",
                  }}
                />
              </li>
              <li className="inline-block w-1/3">
                <Image
                  src="https://greenbricks.co.kr/images/business_02.png"
                  alt="business_02.png"
                  data-fixed-width="300"
                  width={300}
                  height={300}
                  sizes="100vw"
                  style={{
                    width: "100%",
                  }}
                />
              </li>
              <li className="inline-block w-1/3">
                <Image
                  src="https://greenbricks.co.kr/images/business_03.png"
                  alt="business_03.png"
                  data-fixed-width="300"
                  width={300}
                  height={300}
                  sizes="100vw"
                  style={{
                    width: "100%",
                  }}
                />
              </li>
              <li className="inline-block w-1/3">
                <Image
                  src="https://greenbricks.co.kr/images/business_04.png"
                  alt="business_04.png"
                  data-fixed-width="300"
                  width={300}
                  height={300}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    margin: "0 auto",
                  }}
                />
              </li>
              <li className="inline-block w-1/3">
                <Image
                  src="https://greenbricks.co.kr/images/business_05.png"
                  alt="business_05.png"
                  data-fixed-width="300"
                  width={300}
                  height={300}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    margin: "0 auto",
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
        <div id="recruit_wrap">
          <div id="recruit_title">
            <ul
              id="business_title_c"
              style={{ listStyle: "none", width: "90%", margin: "0 auto" }}
            >
              <li className="business_bt1">
                <Image
                  src="https://greenbricks.co.kr/images/recruit_title01.png"
                  alt="recruit_title01.png"
                  width={611}
                  height={65}
                  sizes="100vw"
                  style={{
                    width: "70%",
                    margin: "0 auto",
                  }}
                  className="pb-12 pt-24"
                />
              </li>
              <li
                className="business_bt2 pb-4"
                style={{
                  textAlign: "left",
                  fontFamily: "Pretendard-Regular",
                  color: "#000000",
                  fontSize: "1.4rem",
                  lineHeight: "1.8rem",
                }}
              >
                그린브릭스에서는 구성원마다 새로운 경험을 만들어 가길 바라는
                마음으로 시작했습니다.
                <br />
                일하기 즐거운 회사 그린브릭스에서 함께 블록을 쌓아 주실 여러분을
                기다립니다.
              </li>
              <li className="business_bt3 pb-16 pt-12">
                <a href="mailto:recruit@greenbricks.co.kr" target="_blank">
                  <Image
                    src="https://greenbricks.co.kr/images/recruit_btn.png"
                    alt="회사소개서"
                    width={409}
                    height={83}
                    sizes="100vw"
                    style={{
                      width: "45%",
                      margin: "0 auto",
                    }}
                  />
                </a>
              </li>
            </ul>
          </div>

          <div id="recruit_img" className="a-center sizeup">
            <Image
              src="https://greenbricks.co.kr/images/recruit_img_left.png"
              alt="recruit_img_left.png"
              style={{ padding: "100px 0 50px 0" }}
              width={549}
              height={712}
            />
          </div>
          <div id="recruit_box">
            <ul
              id="recruit"
              style={{ textAlign: "left", color: "#000000" }}
              className="a-center"
            >
              <li className="recruit_line"></li>
              <li>
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
                <br /> / · 1인1법인카드
                <br />
                · 웰컴키트 지급
                <br />
                · 10주간 온보딩 프로그램 진행
                <br />· 필요시 재택근무 시행(업무환경지원)
              </li>

              <li className="recruit_line"></li>
              <li>
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

              <li className="recruit_line"></li>
              <li>
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

        <div id="contact_wrap">
          <div id="contact_title">
            <ul
              id="contact_title_c"
              style={{ listStyle: "none", width: "90%", margin: "0 auto" }}
            >
              <li className="contact_pb1">
                <Image
                  src="https://greenbricks.co.kr/images/contact_title01.png"
                  alt="contact_title01.png"
                  width={882}
                  height={53}
                />
              </li>
              <li className="contact_pb2">
                평균 9년 업력의 퍼포먼스 마케터들이 모였습니다.
                <br />
                클라이언트와 같은 마음으로 고민하고 성과를 낼 수 있는 마케팅
                솔루션을 제안하겠습니다.
              </li>
            </ul>
          </div>

          <div id="contact_box">
            <ul id="contact" style={{ listStyle: "none" }}>
              <li>
                <a href="mailto:mkt_gb@greenbricks.co.kr" target="_blank">
                  <Image
                    src="https://greenbricks.co.kr/images/contact_btn01.png"
                    alt="이메일문의"
                    width={409}
                    height={82}
                  />
                </a>
              </li>
              <li>
                <a href="tel:0263950525" target="_blank">
                  <Image
                    src="https://greenbricks.co.kr/images/contact_btn02.png"
                    alt="전화문의"
                    width={409}
                    height={82}
                  />
                </a>
              </li>
            </ul>
          </div>
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

        <div id="footer">
          <ul
            className="text_footer"
            style={{ width: "90%", margin: "0 auto", padding: "50px 0 50px 0" }}
          >
            <li>서울시 금천구 가산디지털1로 181, 가산더블유센터 1105~06호</li>
            <li>T +82 2 6395 0501</li>
            <li>F +82 2 6395 0528</li>
            <li>대표이사 : 심홍수</li> <br />
            <li>ⓒ 2021 greenbricks Company. All Rights Reserved.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Mobile;
