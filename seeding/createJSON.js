const fs = require("fs");
const path = require("path");

let dataArr = [
  {
    title:
      "TradeUP Acquisition Corp. Announces Extension of the Deadline for an Initial Business Combination",
    date: "2023-01-20T21:33:00.000Z",
    href: "https://www.prnewswire.com/news-releases/tradeup-acquisition-corp-announces-extension-of-the-deadline-for-an-initial-business-combination-301727358.html",
    hostName: "prnewswire.com",
  },
  {
    title: "CARGILL COMPLETES ACQUISITION OF OWENSBORO GRAIN COMPANY",
    date: "2023-01-20T16:51:00.000Z",
    href: "https://www.prnewswire.com/news-releases/cargill-completes-acquisition-of-owensboro-grain-company-301727066.html",
    hostName: "prnewswire.com",
  },
  {
    title:
      "J.P. Morgan Asset Management Receives Regulatory Approval for 100% Ownership of China Joint Venture",
    date: "2023-01-20T15:55:00.000Z",
    href: "https://www.prnewswire.com/news-releases/jp-morgan-asset-management-receives-regulatory-approval-for-100-ownership-of-china-joint-venture-301727014.html",
    hostName: "prnewswire.com",
  },
  {
    title:
      "Ren Bolsters Philanthropic Tech &amp; Services Offerings with Acquisition of Stellar Technology Solutions",
    date: "2023-01-20T14:30:00.000Z",
    href: "https://www.prnewswire.com/news-releases/ren-bolsters-philanthropic-tech--services-offerings-with-acquisition-of-stellar-technology-solutions-301726332.html",
    hostName: "prnewswire.com",
  },
  {
    title:
      "Air Products, Aramco, ACWA Power, and Air Products Qudra Reach Financial Close and Transfer Second Group of Assets for $12 Billion Gasification and Power Joint Venture at Jazan, Saudi Arabia",
    date: "2023-01-20T13:30:00.000Z",
    href: "https://www.prnewswire.com/news-releases/air-products-aramco-acwa-power-and-air-products-qudra-reach-financial-close-and-transfer-second-group-of-assets-for-12-billion-gasification-and-power-joint-venture-at-jazan-saudi-arabia-301726853.html",
    hostName: "prnewswire.com",
  },
  {
    title:
      "Atlas Announces Shareholder Meeting Date in Connection with Poseidon Acquisition",
    date: "2023-01-20T13:00:00.000Z",
    href: "https://www.prnewswire.com/news-releases/atlas-announces-shareholder-meeting-date-in-connection-with-poseidon-acquisition-301726228.html",
    hostName: "prnewswire.com",
  },
  {
    title:
      "Magnet Forensics Inc. Enters into Definitive Agreement to be Acquired by Thoma Bravo",
    date: "2023-01-20T16:47:00.000Z",
    href: "https://www.businesswire.com/news/home/20230120005386/en/Magnet-Forensics-Inc.-Enters-into-Definitive-Agreement-to-be-Acquired-by-Thoma-Bravo",
    hostName: "businesswire.com",
  },
  {
    title:
      "Alterra Mountain Company Adds Snow Valley Mountain Resort in Southern California to Its Family of Destinations",
    date: "2023-01-20T15:45:00.000Z",
    href: "https://www.businesswire.com/news/home/20230120005068/en/Alterra-Mountain-Company-Adds-Snow-Valley-Mountain-Resort-in-Southern-California-to-Its-Family-of-Destinations",
    hostName: "businesswire.com",
  },
  {
    title:
      "Generational Equity Advises Fulcrum Research Group in its Sale to SAI MedPartners",
    date: "2023-01-20T11:00:00.000Z",
    href: "https://www.businesswire.com/news/home/20230120005014/en/Generational-Equity-Advises-Fulcrum-Research-Group-in-its-Sale-to-SAI-MedPartners",
    hostName: "businesswire.com",
  },
  {
    title: "Benefitfocus Shareholders Approve Merger with Voya Financial",
    date: "2023-01-20T21:15:00.000Z",
    href: "https://www.globenewswire.com/en/news-release/2023/01/20/2592741/28346/en/Benefitfocus-Shareholders-Approve-Merger-with-Voya-Financial.html",
    hostName: "globenewswire.com",
  },
  {
    title:
      "Oaktree Specialty Lending Corporation and Oaktree Strategic Income II, Inc. Announce Stockholder Approvals of Merger",
    date: "2023-01-20T21:05:00.000Z",
    href: "https://www.globenewswire.com/en/news-release/2023/01/20/2592736/10393/en/Oaktree-Specialty-Lending-Corporation-and-Oaktree-Strategic-Income-II-Inc-Announce-Stockholder-Approvals-of-Merger.html",
    hostName: "globenewswire.com",
  },
  {
    title: "CORRECTION -- InvestmentPitch Media and iMining Technologies",
    date: "2023-01-20T15:43:00.000Z",
    href: "https://www.globenewswire.com/en/news-release/2023/01/20/2592568/0/en/CORRECTION-InvestmentPitch-Media-and-iMining-Technologies.html",
    hostName: "globenewswire.com",
  },
  {
    title: "Form 8.3 - K3 Capital Group plc",
    date: "2023-01-20T15:30:00.000Z",
    href: "https://www.globenewswire.com/en/news-release/2023/01/20/2592561/0/en/Form-8-3-K3-Capital-Group-plc.html",
    hostName: "globenewswire.com",
  },
  {
    title:
      "Davidson Kempner Capital Management LP : Form 8.3 - Horizon Therapeutics plc",
    date: "2023-01-20T15:20:00.000Z",
    href: "https://www.globenewswire.com/en/news-release/2023/01/20/2592554/0/en/Davidson-Kempner-Capital-Management-LP-Form-8-3-Horizon-Therapeutics-plc.html",
    hostName: "globenewswire.com",
  },
  {
    title:
      "Novo Reaches Second and Final Completion Milestone With Creasy Group",
    date: "2023-01-20T14:09:00.000Z",
    href: "https://www.globenewswire.com/en/news-release/2023/01/20/2592510/0/en/Novo-Reaches-Second-and-Final-Completion-Milestone-With-Creasy-Group.html",
    hostName: "globenewswire.com",
  },
  {
    title:
      "Citizen Services AI Market Size Hits $41.0 Billion by 2027, growing at a CAGR of 44.5%: Report by MarketsandMarkets™",
    date: "2023-01-20T13:45:00.000Z",
    href: "https://www.globenewswire.com/en/news-release/2023/01/20/2592487/0/en/Citizen-Services-AI-Market-Size-Hits-41-0-Billion-by-2027-growing-at-a-CAGR-of-44-5-Report-by-MarketsandMarkets.html",
    hostName: "globenewswire.com",
  },
  {
    title: "Horizon Therapeutics plc",
    date: "2023-01-20T13:44:00.000Z",
    href: "https://www.globenewswire.com/en/news-release/2023/01/20/2592485/0/en/Horizon-Therapeutics-plc.html",
    hostName: "globenewswire.com",
  },
  {
    title:
      "Black Knight gains amid report about potential divestures in ICE sale (update)",
    date: "2023-01-21T01:13:44.425Z",
    href: "https://seekingalpha.com/news/3926467-black-knight-gains-amid-report-about-potential-divestures-in-ice-sale?source=content_type%3Areact%7Cfirst_level_url%3Amarket-news%7Csection_asset%3Amain%7Csection%3Am-a",
    hostName: "seekingalpha.com",
  },
  {
    title: "Playtika's boosted Rovio bid raises eyebrows at BTIG",
    date: "2023-01-21T01:13:44.426Z",
    href: "https://seekingalpha.com/news/3926449-playtikas-boosted-rovio-bid-raises-eyebrows-at-btig?source=content_type%3Areact%7Cfirst_level_url%3Amarket-news%7Csection_asset%3Amain%7Csection%3Am-a",
    hostName: "seekingalpha.com",
  },
  {
    title:
      "National Instruments gains amid report of interest from several strategics",
    date: "2023-01-21T01:13:44.427Z",
    href: "https://seekingalpha.com/news/3926433-national-instruments-gains-amid-report-of-interest-from-several-strategics?source=content_type%3Areact%7Cfirst_level_url%3Amarket-news%7Csection_asset%3Amain%7Csection%3Am-a",
    hostName: "seekingalpha.com",
  },
  {
    title:
      "Cellnex jumps 10% on speculation of takeover offer from American Tower, Brookfield",
    date: "2023-01-21T01:13:44.427Z",
    href: "https://seekingalpha.com/news/3926428-cellnex-jumps-10-on-speculation-of-takeover-offer-from-american-tower-brookfield?source=content_type%3Areact%7Cfirst_level_url%3Amarket-news%7Csection_asset%3Amain%7Csection%3Am-a",
    hostName: "seekingalpha.com",
  },
  {
    title: "Thoma Bravo agrees to buy Magnet Forensics for C$1.8B",
    date: "2023-01-21T01:13:44.428Z",
    href: "https://seekingalpha.com/news/3926416-thoma-bravo-agrees-to-buy-magnet-forensics-for-c18-billion?source=content_type%3Areact%7Cfirst_level_url%3Amarket-news%7Csection_asset%3Amain%7Csection%3Am-a",
    hostName: "seekingalpha.com",
  },
  {
    title:
      "Tower Semi falls on report Intel won't expand chip production in China",
    date: "2023-01-21T01:13:44.428Z",
    href: "https://seekingalpha.com/news/3926395-tower-semi-falls-on-report-intel-wont-expand-chip-production-in-china?source=content_type%3Areact%7Cfirst_level_url%3Amarket-news%7Csection_asset%3Amain%7Csection%3Am-a",
    hostName: "seekingalpha.com",
  },
  {
    title:
      "Altra Industrial Motion gains as Regal Rexnord deal gets simplified China review",
    date: "2023-01-21T01:13:44.429Z",
    href: "https://seekingalpha.com/news/3926376-altra-industrial-motion-gains-as-regal-rexnord-deal-gets-simplified-china-review?source=content_type%3Areact%7Cfirst_level_url%3Amarket-news%7Csection_asset%3Amain%7Csection%3Am-a",
    hostName: "seekingalpha.com",
  },
];

let filePath = path.join(__dirname, "dailyTransactionSample.json");
let jsonString = JSON.stringify(dataArr);
console.log(jsonString);

fs.writeFile(filePath, jsonString, (err) => {
  if (err) {
    console.log("An error occurred while writing JSON Object to File.");
    return console.log(err);
  }
  console.log("JSON file has been saved.");
});
