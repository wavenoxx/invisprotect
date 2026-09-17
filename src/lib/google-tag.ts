export const CONSENT_STORAGE_KEY = "consent_settings_v2";

export interface HeadScriptDescriptor {
  id?: string;
  type?: string;
  children?: string;
}

const consentBootstrap = `(function(){
if(window.__invisprotectConsentBootstrapped)return;
window.__invisprotectConsentBootstrapped=true;
window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
var state={ad_storage:"denied",analytics_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"};
var keys=["ad_storage","analytics_storage","ad_user_data","ad_personalization"];
try{var saved=JSON.parse(localStorage.getItem("${CONSENT_STORAGE_KEY}")||"null");if(saved&&typeof saved.timestamp==="string"&&keys.every(function(key){return saved[key]==="granted"||saved[key]==="denied";})){keys.forEach(function(key){state[key]=saved[key];});}}catch(e){}
window.gtag("consent","default",Object.assign({},state,{wait_for_update:500}));
window.gtag("set","ads_data_redaction",true);
window.gtag("set","url_passthrough",true);
})();`;

export function getGoogleTagHeadScripts(accountId: string): HeadScriptDescriptor[] {
  const scripts: HeadScriptDescriptor[] = [
    { id: "invisprotect-consent-defaults", children: consentBootstrap },
  ];
  if (!/^AW-\d+$/.test(accountId)) return scripts;

  scripts.push({
    id: "invisprotect-google-tag-loader",
    children: `(function(){
if(window.__invisprotectGtagConfigured)return;
window.__invisprotectGtagConfigured=true;
var script=document.createElement("script");
script.id="invisprotect-google-tag";
script.async=true;
script.src="https://www.googletagmanager.com/gtag/js?id=${accountId}";
document.head.appendChild(script);
window.gtag("js",new Date());
window.gtag("config","${accountId}",{send_page_view:false});
})();`,
  });
  return scripts;
}
