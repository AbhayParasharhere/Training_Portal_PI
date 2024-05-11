import React from "react";
import styles from "./styles.module.scss";

export default function AllLinks() {
  const linkData = [
    {
      heading: "Assumption Life",
      links: [
        { navlink: "http://www.assomption.ca/", display: "Public Site" },
        {
          navlink:
            "https://www.assomption.ca/en/Advisor-Corner/Document-Centre#?lng=en-US&view=list&page=1",
          display: "Advisor Site",
        },
        {
          navlink:
            "https://www.assomption.ca/CMSPages/GetFile.aspx?guid=9426cf36-4be8-4036-800e-cb5750414e41",
          display: "Investments Funds Performance (Segregated Funds)",
        },
        {
          navlink:
            "https://www.assomption.ca/CMSPages/GetFile.aspx?guid=3bdb245e-0d9a-4e2d-9f0a-c6587810a958",
          display:
            "Investments Funds Performance (Low Fee Investment Account RIA)",
        },
        {
          navlink:
            "https://www.assomption.ca/en/Advisor-Corner/Individual-Insurance/Sales-Tools/Lia-sales-platform",
          display:
            "Illustration Software LIA v 13.1 (ID and password issued by Assumption Life is required for use)",
        },
      ],
    },
    {
      heading: "Beneva (La Capitale & SSQ Insurance)",
      links: [
        { navlink: "https://www.beneva.ca/en", display: "Public Site" },
        {
          navlink:
            "https://www.beneva.ca/en/iifs-brokers/online-tools-services/advisor-centre",
          display: "Advisor Site",
        },
        {
          navlink:
            "https://www.beneva.ca/en/iifs-brokers/online-tools-services/advisor-centre",
          display: "Applications & Forms",
        },
      ],
    },
    {
      heading: "Blendable",
      links: [{ navlink: "https://www.blendable.ca/", display: "Public Site" }],
    },

    {
      heading: "Blue Cross Canada",
      links: [
        { navlink: "http://www.bluecross.ca/", display: "Public Site" },
        {
          navlink: "https://on.bluecross.ca/advisor-resources",
          display: "Advisor Site",
        },
        {
          navlink:
            "https://www.info-partners.ca/b2b/download/Portail_V1.0.2.exe",
          display: "Illustration Software v 1.0.2",
        },
      ],
    },
    {
      heading: "BMO Insurance",
      links: [
        { navlink: "http://www.bmo.com/insurance", display: "Public Site" },
        {
          navlink:
            "https://advisorsupport.bmoinsurance.com/english/auth/login/login.asp",
          display: "Advisor Site",
        },
        {
          navlink: "http://www.bmoinvestpro.ca/Search/BestWorstPerformance.asp",
          display: "Investment Funds Performance",
        },
        {
          navlink:
            "http://advisorsupport.bmoinsurance.com/wave/ewavedownload.html",
          display: "Illustration Software v 50.1",
        },
      ],
    },
    {
      heading: "Canada Life",
      links: [
        {
          navlink: "http://www.canadalife.com/003/Home/index.htm",
          display: "Public Site",
        },
        {
          navlink: "http://repnet2.canadalife.com/public/wsps/portal/advcl",
          display: "Advisor Site",
        },
        {
          navlink:
            "http://repnet2.canadalife.com/public/wsps/portal/!ut/p/c1/04_SB8K8xLLM9MSSzPy8xBz9CP0os3gDC2MDM7cwP1c3A19PdwtXD2cDKNAPB-nAVOFmCVeBVd4VXR4HcDTQ9_PIz03VL8jODrJwVFQEAEKeEec!/dl2/d1/L2dJQSEvUUt3QS9ZQnB3LzZfMDgzMDZGVk5FRjBNSUc4RVRDMDAwMDAwMDA!/",
          display:
            "Life Insurance Rates & Values | Investment Funds Performance",
        },
        {
          navlink:
            "https://repnet2.canadalife.com/public/wsps/portal/!ut/p/c1/04_SB8K8xLLM9MSSzPy8xBz9CP0os3gDC2MDM7cwP1c3A19PdwtXD2cDKNAPB-nAVOFmCVeBVd4VXR4HcDTQ9_PIz03VL8jODrJwVFQEAEKeEec!/dl2/d1/L2dJQSEvUUt3QS9ZQnB3LzZfMDgzMDZGVk5FRjBNSUc4RTREMDAwMDAwMDA!/",
          display: "Applications & Forms",
        },
        {
          navlink: "http://repnet2.canadalife.com/public/wsps/portal/advcl",
          display: "Illustration Software v 4.8.1",
        },
        {
          navlink:
            "https://www.combined-strength.canadalife.com/content/dam/canadalife/advisor-hub-documents/wealth/en/winwithwealthQA_MGA.pdf",
          display: "Promotion: Win With Wealth (Jan 1 – Dec 31, 2022)",
        },
        {
          navlink:
            "https://www.combined-strength.canadalife.com/content/dam/canadalife/advisor-hub-documents/insurance/en/life-insurance/Dial_it_up_resource_page_MGA.pdf",
          display: "Promotion: Dial it Up (Jan 1 – Mar 31, 2022)",
        },
      ],
    },
    {
      heading: "Canada Protection Plan",
      links: [
        { navlink: "https://cpp.ca/", display: "Public Site" },
        {
          navlink:
            "https://www.webi.desjardinslifeinsurance.com/en/public/Pages/default.aspx",
          display: "Advisor Site",
        },
        {
          navlink:
            "https://www.webi.desjardinslifeinsurance.com/en/public/Pages/forms.aspx",
          display: "Applications & Forms",
        },
        {
          navlink: "https://dsignillustration.desjardins.com/en/Accueil",
          display: "Illustration Software: Online Illustrator",
        },
      ],
    },
    {
      heading: "Desjardins Insurance",
      links: [
        {
          navlink: "http://www.desjardinslifeinsurance.com/en/Pages/home.aspx",
          display: "Public Site",
        },
        {
          navlink:
            "https://www.webi.desjardinslifeinsurance.com/en/public/Pages/default.aspx",
          display: "Advisor Site",
        },
        {
          navlink:
            "https://www.desjardinslifeinsurance.com/en/individual-savings/unit-prices-performance?Province=ON",
          display: "Investment Funds Performance",
        },
        {
          navlink:
            "https://www.webi.desjardinslifeinsurance.com/en/public/Pages/forms.aspx",
          display: "Applications & Forms",
        },
        {
          navlink: "https://dsignillustration.desjardins.com/en/Accueil",
          display: "Illustration Software: Online Illustrator",
        },
      ],
    },
    {
      heading: "The EDGE Benefits",
      links: [
        { navlink: "https://www.edgebenefits.com/", display: "Public Site" },
        {
          navlink: "https://www.edgebenefits.com/login",
          display: "Advisor Site",
        },
        {
          navlink: "https://www.edgebenefits.com/ExpressQuote",
          display: "Rates & Values",
        },
        {
          navlink: "https://www.edgebenefits.com/login",
          display: "Applications & Forms",
        },
        {
          navlink: "https://www.edgebenefits.com/EQA",
          display: "Illustration Software: Online Illustrator",
        },
      ],
    },
    {
      heading: "Empire Life",
      links: [
        { navlink: "http://www.empire.ca/", display: "Public Site" },
        { navlink: "http://www.empire.ca/Advisor/", display: "Advisor Site" },
        {
          navlink: "https://www.empire.ca/docs/pdf/Risk-Rates-EN.pdf",
          display:
            "Life Insurance Rates & Values | Investment Funds Performance",
        },
        {
          navlink:
            "https://www.empire.ca/advisor/business-building/software-downloads/envision",
          display: "Illustration Software v 13.1 (Install Key: EFG-MG42T)",
        },
        { navlink: "TBD", display: "Illustration Software: eVision" },
        {
          navlink:
            "https://www.empire.ca/sites/default/files/2021-12/CIRE-2021-30-EN-web.pdf",
          display: "Promotion: The BIGGER eBundle Bonus (Jan 1 – Dec 31, 2022)",
        },
      ],
    },
    {
      heading: "Equitable Life",
      links: [
        { navlink: "http://www.equitable.ca/", display: "Public Site" },
        {
          navlink: "http://www.equitable.ca/advisorhome/index.asp",
          display: "Advisor Site",
        },
        {
          navlink: "http://www.equitable.ca/advisorhome/insurance/rates.asp",
          display:
            "Life Insurance Rates & Values | Investment Funds Performance",
        },
        {
          navlink: "http://www.equitable.ca/advisorhome/insurance/forms.asp",
          display: "Insurance Applications & Forms",
        },
        {
          navlink:
            "http://www.equitable.ca/advisorhome/savings_retirement/forms.asp",
          display: "Investments Applications & Forms",
        },
        {
          navlink:
            "https://advisor.equitable.ca/advisor/en/forms/sales-illustrations",
          display: "Illustration Software v 2023-1",
        },
      ],
    },
    {
      heading: "Foresters Financial",
      links: [
        {
          navlink: "https://www.foresters.com/en-ca#gref",
          display: "Public Site",
        },
        {
          navlink: "https://bluesky.foresters.com/webgui/login.aspx",
          display: "Advisor Site",
        },
        {
          navlink: "https://sky.foresters.com/skyinstall/skyinstallation.exe",
          display: "Illustration Software v 2.0.188",
        },
      ],
    },
    {
      heading: "Humania Assurance",
      links: [
        {
          navlink: "https://www.humania.ca/en-CA/home",
          display: "Public Site",
        },
        {
          navlink: "https://extranet.humania.ca/home",
          display: "Advisor Site",
        },
        {
          navlink: "https://www.humania.ca/en-CA/representatives/forms",
          display: "Applications Forms",
        },
        {
          navlink: "https://www.humania.ca/en-CA/doc/download-our-new-software",
          display: "Illustration Software v 2020.1",
        },
      ],
    },
    {
      heading: "iA Financial Group",
      links: [
        { navlink: "http://www.inalco.com/", display: "Public Site" },
        {
          navlink:
            "https://iaa.secureweb.inalco.com/portal/ind/server.pt/community/ind_-_comunity/330",
          display: "Advisor Site",
        },
        {
          navlink: "https://ia.ca/funds-performance",
          display: "Investment Funds Performance",
        },
        {
          navlink:
            "http://wpc.cdn.inalco.com/SuiteInterface/Versions/InstallationCorporative_900.exe",
          display: "Illustration Software v 9.14",
        },
      ],
    },
    {
      heading: "iA Excellence",
      links: [
        {
          navlink: "http://www.iaexcellence.com/en/index.php",
          display: "Public Site",
        },
        {
          navlink:
            "https://portail.iaexcellence.com/Portail/App/Views/AuthenticationViews/Index.aspx?ReturnUrl=%2fportail%2fApp%2fViews%2fSharedViews%2fDashBoard.aspx&lang=en-CA",
          display: "Advisor Site",
        },
        {
          navlink: "http://www.iaexcellence.com/en/forms",
          display: "Applications & Forms",
        },
        {
          navlink: "https://ago.iaexcellence.com/",
          display: "Illustration Software Assure&go",
        },
      ],
    },
    {
      heading: "ivari",
      links: [
        { navlink: "http://ivari.ca/", display: "Public Site" },
        {
          navlink:
            "https://securewebapp.ivari.ca/usermanagement/account/login/en",
          display: "Advisor Site",
        },
        {
          navlink: "http://www.transamerica.ca/ratesTLC/en/rates/default.asp",
          display: "Life Insurance Rates & Values",
        },
        {
          navlink: "http://www.transamerica.ca/ratesTLC/en/rates/default.asp",
          display: "Investment Funds Performance",
        },
        {
          navlink: "https://ivari.ca/tools-and-resources/administration/",
          display: "Applications & Forms",
        },
        {
          navlink: "https://ivari.ca/for-my-business/advisor-tools/lifeview/",
          display: "Illustration Software v 2022.0",
        },
      ],
    },
    {
      heading: "Manulife Financial",
      links: [
        { navlink: "https://www.manulife.ca/", display: "Public Site" },
        {
          navlink: "https://www.manulife.ca/repsource",
          display: "Advisor Site",
        },
        {
          navlink:
            "https://repsourcepublic.manulife.com/wps/portal/Repsource/PublicHome/!ut/p/c5/04_SB8K8xLLM9MSSzPy8xBz9CP0os3hPQ2cnYzdTEwN_bwtLA8_AYCf_wDATI_dQI6B8pFm8AQ7gaEBAt59Hfm6qfkFuRDkA9fW7RQ!!/dl3/d3/L2dJQSEvUUt3QS9ZQnZ3LzZfSTFDQjNGNTQwT0s4OTBJUVNCT1FWNDJHVTI!/?WCM_GLOBAL_CONTEXT=",
          display:
            "Applications & Forms (You must log into Repsource to download this)",
        },
        {
          navlink:
            "https://repsourcepublic.manulife.com/wps/portal/Repsource/PublicHome/!ut/p/c5/04_SB8K8xLLM9MSSzPy8xBz9CP0os3hPQ2cnYzdTEwN_bwtLA8_AYCf_wDATI_dQI6B8pFm8AQ7gaEBAt59Hfm6qfkFuRDkA9fW7RQ!!/dl3/d3/L2dJQSEvUUt3QS9ZQnZ3LzZfSTFDQjNGNTQwT0s4OTBJUVNCT1FWNDJHVTI!/?WCM_GLOBAL_CONTEXT=",
          display:
            "Illustration Software v 17.01 (You must log into Repsource to download this)",
        },
        {
          navlink: "TBD",
          display: "Promotion: Grow for it 2022 (Jan 1 – Dec 31)",
        },
      ],
    },
    {
      heading: "RBC Insurance",
      links: [
        {
          navlink: "https://www.rbcinsurance.com/personal.html",
          display: "Public Site",
        },
        {
          navlink:
            "https://www.rbcinsurance.com/sales-resource-centre/my-business.html",
          display: "Advisor Site",
        },
        {
          navlink: "http://www.rbcinsurance.com/returns",
          display: "Life Insurance Rates & Values",
        },
        {
          navlink:
            "https://www.rbcinsurance.com/sales-resource-centre/wealth-management/sales_tools.html",
          display: "Investment Funds Performance",
        },
        {
          navlink:
            "http://www.rbcinsurance.com/salesresourcecentre/cid-118398.html",
          display: "Applications & Forms",
        },
        {
          navlink:
            "https://www.rbcinsurance.com/sales-resource-centre/individual-life/sales_tools.html",
          display: "Illustration Software v 11.8 (CD Key: 62B46)",
        },
      ],
    },
    {
      heading: "Serenia Life",
      links: [
        { navlink: "https://www.serenialife.ca/", display: "Public Site" },
        {
          navlink: "https://springboard.serenialife.ca/",
          display: "Advisor Site",
        },
        {
          navlink:
            "https://springboard.serenialife.ca/supporting-my-business/#new-business-illustration",
          display: "Downloadable Illustration Software",
        },
        {
          navlink:
            "https://springboard.serenialife.ca/supporting-my-business/#new-business-illustration",
          display: "Online Illustrator",
        },
        {
          navlink: "TBD",
          display: "Promotion: Pay-It-Forward Bonus (Jan 1 – Dec 31, 2023)",
        },
      ],
    },
    {
      heading: "Specialty Life Insurance",
      links: [
        {
          navlink: "https://specialtylifeinsurance.ca/",
          display: "Public Site",
        },
      ],
    },
    {
      heading: "Sun Life Financial",
      links: [
        { navlink: "http://www.sunlife.ca/", display: "Public Site" },
        {
          navlink:
            "https://www.sunnet.sunlife.com/slfadvisor/signin/e/CommonSignin.aspx?",
          display: "Advisor Site",
        },
        {
          navlink:
            "http://www.sunlife.ca/plan/v/index.jsp?vgnextoid=204ab91b51966110VgnVCM1000002dd2d09fRCRD&vgnLocale=en_CA&chnpath=/Rates",
          display: "Life Insurance Rates & Values",
        },
        {
          navlink:
            "https://www.sunlife.ca/advisor/v/index.jsp?vgnextoid=caad7c05cd73f110VgnVCM1000009b80d09fRCRD&vgnextfmt=default&vgnLocale=en_CA&authgroup=SLFDEFPUB",
          display: "Applications & Forms",
        },
        {
          navlink:
            "https://www.sunlife.ca/slfas/Tools+and+Illustrations/Illustrations/Sun+Life+Illustrations+and+Eos+download?vgnLocale=en_CA",
          display: "Illustration Software v 5.4.0",
        },
      ],
    },
    {
      heading: "UV Insurance",
      links: [
        { navlink: "https://uvinsurance.ca/", display: "Public Site" },
        {
          navlink: "https://apps.uvmutuelle.ca/AccesCourtiers/?langue=en",
          display: "Advisor Site",
        },
        {
          navlink: "https://uvinsurance.ca/current-rates/",
          display: "Current rates",
        },
        {
          navlink:
            "https://uvinsurance.ca/services/individual-insurance/forms/",
          display: "Applications & Forms",
        },
        {
          navlink: "https://uvinsurance.ca/?login",
          display: "Illustration Software: Online Illustrator",
        },
      ],
    },
  ];

  const renderLinks = linkData.map((link) => {
    return (
      <div className={styles["allLinks--link-container"]}>
        <p className={styles["allLinks--heading"]}>{link.heading}</p>
        <div className={styles["allLinks--link-inner-container"]}>
          {link.links.map((url) => {
            return (
              <a
                className={styles["allLinks--link-text"]}
                href={url.navlink}
                target="_blank"
              >
                {url.display}
              </a>
            );
          })}
        </div>
      </div>
    );
  });
  return (
    <div className={styles["allLinks--main-container"]}>
      {renderLinks}
      {/* <div className={styles["allLinks--link-container"]}>
        <p className={styles["allLinks--heading"]}>Heading 1</p>
        <div className={styles["allLinks--link-inner-container"]}>
          <p className={styles["allLinks--sub-heading"]}>Sub heading</p>
          <a
            className={styles["allLinks--link-text"]}
            href="http://www.labdrill.com"
            target="_blank"
          >
            http://www.labdrill.com
          </a>
          <a
            className={styles["allLinks--link-text"]}
            href="http://www.labdrill.com"
            target="_blank"
          >
            http://www.labdrill.com
          </a>{" "}
          <a
            className={styles["allLinks--link-text"]}
            href="http://www.labdrill.com"
            target="_blank"
          >
            http://www.labdrill.com
          </a>{" "}
          <a
            className={styles["allLinks--link-text"]}
            href="http://www.labdrill.com"
            target="_blank"
          >
            http://www.labdrill.com
          </a>
        </div>
      </div> */}
    </div>
  );
}
