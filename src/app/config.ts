// 
function makeAppConfig() {
    let date = new Date();
    let year = date.getFullYear();

    let AppConfig = {
        brand: 'Indus',
        user: '',
        // appUrl: "https://indusdev-dot-indus-tower.appspot.com",    //uat
        //appUrl: "https://backendprod-dot-indus-tower.appspot.com",   //prod
        appUrl: "http://localhost:8080",
        //appUrl: "http://localhost:8182", 
        //appUrl: "https://dwnld-xlsx-sd-dot-indus-tower.appspot.com",
        google_client_id: '218262154035-hemh2uaiclidhsi1hutpaa1g67apcv7b.apps.googleusercontent.com',
        AZURE_TENANT_ID: '',
        AZURE_CLIENT_ID: '',
        year: year,
        layoutBoxed: false,                             // true, false
        navCollapsed: false,                            // true, false
        navBehind: false,                               // true, false
        fixedHeader: true,                              // true, false
        sidebarWidth: 'middle',                         // small, middle, large      
        theme: 'light',                                 // light, gray, dark
        colorOption: '11',      //33 is for green                        // 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
        AutoCloseMobileNav: false,                       // true, false. Automatically close sidenav on route change (Mobile only)
        productLink: ''
    };

    return AppConfig;
}

export const APPCONFIG = makeAppConfig();