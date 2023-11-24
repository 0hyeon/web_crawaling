import { PrismaClient, Prisma, PcBanner } from "@prisma/client";
import jsonfile  from "../public/temp_file_231113.json";
import { FEcheckEnvironment } from "@libs/server/useCheckEnvironment";
import { BannerInfo, IJobkoAppsData } from "types/type";
const prisma = new PrismaClient();

async function main() {
  const ArrayData: IJobkoAppsData[] = [];
  const dataArray = Array.isArray(jsonfile) ? jsonfile : [jsonfile];
  dataArray.map((dataObj) => {  
    ArrayData.push({
      Category: dataObj['구분'],
      AttributedTouchType: dataObj['Attributed Touch Type'] === null ? '': dataObj['Attributed Touch Type'],
      AttributedTouchTime: dataObj['Attributed Touch Time'] === null ? '': dataObj['Attributed Touch Time'],
      InstallTime: dataObj['Install Time'] === null ? '': dataObj['Install Time'],
      EventTime:dataObj['Event Time'] === null ? '': dataObj['Event Time'],
      EventName:dataObj['Event Name'] === null ? '': dataObj['Event Name'],
      Partner:dataObj['Partner'] === null ? '': dataObj['Partner'],
      MediaSource:dataObj['Media Source'] === null ? '': dataObj['Media Source'],
      Channel:dataObj['Channel'] === null ? '': dataObj['Channel'],
      Keywords:dataObj['Keywords'] === null ? '': dataObj['Keywords'],
      Campaign:dataObj['Campaign'] === null ? '': dataObj['Campaign'],
      Adset:dataObj['Adset'] === null ? '': dataObj['Adset'],
      Ad:dataObj['Ad'] === null ? '': dataObj['Ad'],
      AdType:dataObj['Ad Type'] === null ? '': dataObj['Ad Type'],
      Region:dataObj['Region'] === null ? '': dataObj['Region'],
      CountryCode:dataObj['Country Code'] === null ? '': dataObj['Country Code'],
      Carrier:dataObj['Carrier'] === null ? '': dataObj['Carrier'],
      Language:dataObj['Language'] === null ? '': dataObj['Language'],
      AppsFlyerID:dataObj['AppsFlyer ID'] === null ? '': dataObj['AppsFlyer ID'],
      AndroidID:dataObj['Android ID'] === null ? '': dataObj['Android ID'],
      AdvertisingID:dataObj['Advertising ID'] === null ? '': dataObj['Advertising ID'],
      IDFA:dataObj['IDFA'] === null ? '': dataObj['IDFA'],
      IDFV:dataObj['IDFA'] === null ? '': dataObj['IDFA'],
      DeviceCategory:dataObj['Device Category'] === null ? '': dataObj['Device Category'],
      Platform:dataObj['Platform'] === null ? '': dataObj['Platform'],
      OSVersion:dataObj['OS Version'] === null ? '': dataObj['OS Version'],
      AppVersion:dataObj['App Version'] === null ? '': dataObj['App Version'],
      SDKVersion:dataObj['SDK Version'] === null ? '': dataObj['SDK Version'],
      IsRetargeting:dataObj['Is Retargeting'] === null ? '': dataObj['Is Retargeting'],
      RetargetingConversionType:dataObj['Retargeting Conversion Type'] === null ? '': dataObj['Retargeting Conversion Type'],
      IsPrimaryAttribution:dataObj['Is Primary Attribution'] === null ? '': dataObj['Is Primary Attribution'],
      AttributionLookback:dataObj['Attribution Lookback'] === null ? '': dataObj['Attribution Lookback'],
      ReengagementWindow:dataObj['Reengagement Window'] === null ? '': dataObj['Reengagement Window'],
      MatchType:dataObj['Match Type'] === null ? '': dataObj['Match Type'],
      UserAgent:dataObj['User Agent'] === null ? '': dataObj['User Agent'],
      ConversionType:dataObj['Conversion Type'] === null ? '': dataObj['Conversion Type'],
      CampaignType:dataObj['Campaign Type'] === null ? '': dataObj['Campaign Type'],
      DeviceModel:dataObj['Device Model'] === null ? '': dataObj['Device Model'],
      KeywordID:dataObj['Keyword ID'] === null ? '': dataObj['Keyword ID'],
      PivotTime:dataObj['Pivot time'] === null ? '': dataObj['Pivot time'],
    })
    
    // console.log("Event Name:", dataObj['Event Name']);
    // const eventTime = dataObj['Event Time'];
  })
  // console.log(ArrayData)
  try {
    for (const el of ArrayData) {
      console.log(el)
      await prisma.jobkoAppsData.createMany({ data: el });
      // const result = await prisma.jobkoAppsData.deleteMany({ });
      // console.log(`Created ${result}`);
    }
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
