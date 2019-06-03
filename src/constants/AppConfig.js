/**
 * App Config File
 */
import moment from "moment";
import { GUID } from "../helpers/helpers";

const AppConfig = {
  appLogo: require("../assets/img/site-logo1.png"), // App Logo
  crlImage1: require("../assets/img/Image_1.jpg"), // carousel image 1
  crlImage2: require("../assets/img/Image_2.jpg"), // carousel image 2
  crlImage3: require("../assets/img/Image_3.jpg"), // carousel image 3
  appUrl: "",
  rememberMeSecretKey: "06880621737846692416001235847516",
  rememberMeSecretIv: "8561754196324561",
  brandName: "Rx Upload Admin", // Brand Name
  navCollapsed: false, // Sidebar collapse
  darkMode: false, // Dark Mode
  boxLayout: false, // Box Layout
  rtlLayout: false, // RTL Layout
  miniSidebar: false, // Mini Sidebar
  sidebarActiveFilter: "dark", // Select Sidebar Color You can Choose following color 'primary', 'blue', 'warning', 'info', 'danger','success','purple'
  enableSidebarBackgroundImage: false, // Enable Sidebar Background Image
  sidebarImage: false, // Select sidebar image
  currency: "$",
  locale: {
    languageId: "english",
    locale: "en",
    name: "English",
    icon: "en"
  },
  enableUserTour: true, // Enable / Disable User Tour
  copyRightText: "Labtrac © 2018 All Rights Reserved.", // Copy Right Text
  // light theme colors
  themeColors: {
    primary: "#5C6AC4",
    warning: "#EEC200",
    danger: "#DE3618",
    success: "#50B83C",
    info: "#47C1BF",
    default: "#657786",
    purple: "#007ACE",
    sky: "#007ACE",
    yellow: "#F49342",
    white: "#FFFFFF",
    dark: "#000000",
    greyLighten: "#DFE3E8",
    grey: "#9FA5AB"
  },
  defaultPageSize: [100, 150, 200, 500],
  defaultGridHeight: "300px",
  // dark theme colors
  darkThemeColors: {
    darkBgColor: "#424242"
  },
  defaultStartDate: moment()
    .subtract(1, "days")
    .startOf("day")
    .toDate()
    .toString(),
  defaultEndDate: moment()
    .startOf("day")
    .toDate()
    .toString(),
  roleAdmin: "Administrator",
  excludedColumns: [
    "id",
    "externalid",
    "salesTerritoryID",
    "customerID",
    "labid"
  ]
    .map(function(value) {
      return value.toLowerCase();
    })
    .sort(),
  countries: [
    "ARUBA [ABW]",
    "AFGHANISTAN [AFG]",
    "ANGOLA [AGO]",
    "ANGUILLA [AIA]",
    "ALBANIA [ALB]",
    "ANDORRA [AND]",
    "NETHERLANDS ANTILLES [ANT]",
    "UNITED ARAB EMIRATES [ARE]",
    "ARGENTINA [ARG]",
    "ARMENIA [ARM]",
    "AMERICAN SAMOA [ASM]",
    "ANTARCTICA [ATA]",
    "FRENCH SOUTHERN TERRITORIES [ATF]",
    "ANTIGUA AND BARBUDA [ATG]",
    "AUSTRALIA [AUS]",
    "AUSTRIA [AUT]",
    "AZERBAIJAN [AZE]",
    "BURUNDI [BDI]",
    "BELGIUM [BEL]",
    "BENIN [BEN]",
    "BURKINA FASO [BFA]",
    "BANGLADESH [BGD]",
    "BULGARIA [BGR]",
    "BAHRAIN [BHR]",
    "BAHAMAS [BHS]",
    "BOSNIA AND HERZEGOVINA [BIH]",
    "BELARUS [BLR]",
    "BELIZE [BLZ]",
    "BERMUDA [BMU]",
    "BOLIVIA [BOL]",
    "BRAZIL [BRA]",
    "BARBADOS [BRB]",
    "BRUNEI DARUSSALAM [BRN]",
    "BHUTAN [BTN]",
    "BOUVET ISLAND [BVT]",
    "BOTSWANA [BWA]",
    "CENTRAL AFRICAN REPUBLIC [CAF]",
    "CANADA [CAN]",
    "COCOS (KEELING) ISLANDS [CCK]",
    "SWITZERLAND [CHE]",
    "CHILE [CHL]",
    "CHINA [CHN]",
    "COTE D`IVOIRE [CIV]",
    "CAMEROON [CMR]",
    "CONGO [COG]",
    "COOK ISLANDS [COK]",
    "COLOMBIA [COL]",
    "COMOROS [COM]",
    "CAPE VERDE [CPV]",
    "COSTA RICA [CRI]",
    "CUBA [CUB]",
    "CHRISTMAS ISLAND [CXR]",
    "CAYMAN ISLANDS [CYM]",
    "CYPRUS [CYP]",
    "CZECH REPUBLIC [CZE]",
    "GERMANY [DEU]",
    "DJIBOUTI [DJI]",
    "DOMINICA [DMA]",
    "DENMARK [DNK]",
    "DOMINICAN REPUBLIC [DOM]",
    "ALGERIA [DZA]",
    "ECUADOR [ECU]",
    "EGYPT [EGY]",
    "ERITREA [ERI]",
    "WESTERN SAHARA [ESH]",
    "SPAIN [ESP]",
    "ESTONIA [EST]",
    "ETHIOPIA [ETH]",
    "FINLAND [FIN]",
    "FIJI [FJI]",
    "FALKLAND ISLANDS (MALVINAS) [FLK]",
    "FRANCE [FRA]",
    "FAROE ISLANDS [FRO]",
    "MICRONESIA, FEDERATED STATES OF [FSM]",
    "FRANCE, METROPOLITAN [FXX]",
    "GABON [GAB]",
    "UNITED KINGDOM [GBR]",
    "GEORGIA [GEO]",
    "GHANA [GHA]",
    "GIBRALTAR [GIB]",
    "GUINEA [GIN]",
    "GUADELOUPE [GLP]",
    "GAMBIA [GMB]",
    "GUINEA-BISSAU [GNB]",
    "EQUATORIAL GUINEA [GNQ]",
    "GREECE [GRC]",
    "GRENADA [GRD]",
    "GREENLAND [GRL]",
    "GUATEMALA [GTM]",
    "FRENCH GUIANA [GUF]",
    "GUAM [GUM]",
    "GUYANA [GUY]",
    "HONG KONG [HKG]",
    "HEARD AND MCDONALD ISLANDS [HMD]",
    "HONDURAS [HND]",
    "CROATIA [HRV]",
    "HAITI [HTI]",
    "HUNGARY [HUN]",
    "INDONESIA [IDN]",
    "INDIA [IND]",
    "BRITISH INDIAN OCEAN TERRITORY [IOT]",
    "IRELAND [IRL]",
    "IRAN, ISLAMIC REPUBLIC OF [IRN]",
    "IRAQ [IRQ]",
    "ICELAND [ISL]",
    "ISRAEL [ISR]",
    "ITALY [ITA]",
    "JAMAICA [JAM]",
    "JORDAN [JOR]",
    "JAPAN [JPN]",
    "KAZAKHSTAN [KAZ]",
    "KENYA [KEN]",
    "KYRGYZSTAN [KGZ]",
    "CAMBODIA [KHM]",
    "KIRIBATI [KIR]",
    "SAINT KITTS AND NEVIS [KNA]",
    "KOREA, REPUBLIC OF [KOR]",
    "KUWAIT [KWT]",
    "LAO PEOPLE`S DEMOCRATIC REPUBLIC [LAO]",
    "LEBANON [LBN]",
    "LIBERIA [LBR]",
    "LIBYAN ARAB JAMAHIRIYA [LBY]",
    "SAINT LUCIA [LCA]",
    "LIECHTENSTEIN [LIE]",
    "SRI LANKA [LKA]",
    "LESOTHO [LSO]",
    "LITHUANIA [LTU]",
    "LUXEMBOURG [LUX]",
    "LATVIA [LVA]",
    "MACAU [MAC]",
    "MOROCCO [MAR]",
    "MONACO [MCO]",
    "MOLDOVA, REPUBLIC OF [MDA]",
    "MADAGASCAR [MDG]",
    "MALDIVES [MDV]",
    "MEXICO [MEX]",
    "MARSHALL ISLANDS [MHL]",
    "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF [MKD]",
    "MALI [MLI]",
    "MALTA [MLT]",
    "MYANMAR [MMR]",
    "MONGOLIA [MNG]",
    "NORTHERN MARIANA ISLANDS [MNP]",
    "MOZAMBIQUE [MOZ]",
    "MAURITANIA [MRT]",
    "MONTSERRAT [MSR]",
    "MARTINIQUE [MTQ]",
    "MAURITIUS [MUS]",
    "MALAWI [MWI]",
    "MALAYSIA [MYS]",
    "MAYOTTE [MYT]",
    "NAMIBIA [NAM]",
    "NEW CALEDONIA [NCL]",
    "NIGER [NER]",
    "NORFOLK ISLAND [NFK]",
    "NIGERIA [NGA]",
    "NICARAGUA [NIC]",
    "NIUE [NIU]",
    "NETHERLANDS [NLD]",
    "NORWAY [NOR]",
    "NEPAL [NPL]",
    "NAURU [NRU]",
    "NEW ZEALAND [NZL]",
    "OMAN [OMN]",
    "PAKISTAN [PAK]",
    "PANAMA [PAN]",
    "PITCAIRN [PCN]",
    "PERU [PER]",
    "PHILIPPINES [PHL]",
    "PALAU [PLW]",
    "PAPUA NEW GUINEA [PNG]",
    "POLAND [POL]",
    "PUERTO RICO [PRI]",
    "KOREA, DEMOCRATIC PEOPLE`S REPUBLIC OF [PRK]",
    "PORTUGAL [PRT]",
    "PARAGUAY [PRY]",
    "FRENCH POLYNESIA [PYF]",
    "QATAR [QAT]",
    "REUNION [REU]",
    "ROMANIA [ROU]",
    "RUSSIAN FEDERATION [RUS]",
    "RWANDA [RWA]",
    "SAUDI ARABIA [SAU]",
    "SUDAN [SDN]",
    "SENEGAL [SEN]",
    "SINGAPORE [SGP]",
    "SAINT HELENA [SHN]",
    "SVALBARD AND JAN MAYEN ISLANDS [SJM]",
    "SOLOMON ISLANDS [SLB]",
    "SIERRA LEONE [SLE]",
    "EL SALVADOR [SLV]",
    "SAN MARINO [SMR]",
    "SOMALIA [SOM]",
    "SAINT PIERRE AND MIQUELON [SPM]",
    "SERBIA [SRB]",
    "SAO TOME AND PRINCIPE [STP]",
    "SURINAME [SUR]",
    "SLOVAKIA (Slovak Republic) [SVK]",
    "SLOVENIA [SVN]",
    "SWEDEN [SWE]",
    "SWAZILAND [SWZ]",
    "SEYCHELLES [SYC]",
    "SYRIAN ARAB REPUBLIC [SYR]",
    "TURKS AND CAICOS ISLANDS [TCA]",
    "CHAD [TCD]",
    "TOGO [TGO]",
    "THAILAND [THA]",
    "TAJIKISTAN [TJK]",
    "TOKELAU [TKL]",
    "TURKMENISTAN [TKM]",
    "EAST TIMOR [TLS]",
    "TONGA [TON]",
    "TRINIDAD AND TOBAGO [TTO]",
    "TUNISIA [TUN]",
    "TURKEY [TUR]",
    "TUVALU [TUV]",
    "TAIWAN, PROVINCE OF CHINA [TWN]",
    "TANZANIA, UNITED REPUBLIC OF [TZA]",
    "UGANDA [UGA]",
    "UKRAINE [UKR]",
    "UNITED STATES MINOR OUTLYING ISLANDS [UMI]",
    "URUGUAY [URY]",
    "UNITED STATES [USA]",
    "UZBEKISTAN [UZB]",
    "VATICAN CITY STATE (HOLY SEE) [VAT]",
    "SAINT VINCENT AND THE GRENADINES [VCT]",
    "VENEZUELA [VEN]",
    "VIRGIN ISLANDS (BRITISH) [VGB]",
    "VIRGIN ISLANDS (U.S.) [VIR]",
    "VIETNAM [VNM]",
    "VANUATU [VUT]",
    "WALLIS AND FUTUNA ISLANDS [WLF]",
    "SAMOA [WSM]",
    "YEMEN [YEM]",
    "YUGOSLAVIA [YUG]",
    "SOUTH AFRICA [ZAF]",
    "ZAIRE [ZAR]",
    "ZAMBIA [ZMB]",
    "ZIMBABWE [ZWE]"
  ],
  states: [
    "Alabama [AK]",
    "Alaska [AL]",
    "Arizona [AR] ",
    "Arkansas [AZ] ",
    "California [CA] ",
    "Colorado [CO] ",
    "Connecticut [CT] ",
    "Delaware [DE] ",
    "Florida [FL] ",
    "Georgia [GA]",
    "Hawaii [HI]",
    "Idaho [IA]",
    "Illinois [ID]",
    "Indiana [IL]",
    "Iowa [IN]",
    "Kansas [KS]",
    "Kentucky [KY]",
    "Louisiana [LA]",
    "Maine [MA]",
    "Maryland [MD]",
    "Massachusetts [ME]",
    "Michigan [MI]",
    "Minnesota [MN]",
    "Mississippi [MO]",
    "Missouri [MS]",
    "Montana [MT]",
    "Nebraska [NC]",
    "Nevada [ND]",
    "New Hampshire [NE]",
    "New Jersey [NH]",
    "New Mexico [NJ]",
    "New York [NM]",
    "North Carolina [NV]",
    "North Dakota [NY]",
    "Ohio [OH]",
    "Oklahoma [OK]",
    "Oregon [OR]",
    "Pennsylvania [PA]",
    "Rhode Island [RI]",
    "South Carolina [SC]",
    "South Dakota [SD]",
    "Tennessee [TN]",
    "Texas [TX]",
    "Utah [UT]",
    "Vermont [VA]",
    "Virginia [VT]",
    "Washington [WA]",
    "West Virginia [WI]",
    "Wisconsin [WV]",
    "Wyoming [WY]"
  ]
};

export default AppConfig;
