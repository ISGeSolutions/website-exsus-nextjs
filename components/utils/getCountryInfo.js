function getDeviceInfo() {
    if (typeof navigator !== 'undefined') {
        const userAgent = navigator.userAgent;

        // Dynamically fetch the device address (replace with a server-side solution)
        const deviceAddressPromise = fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => data.ip)
            .catch(error => {
                console.error('Error fetching device address:', error);
                return 'unknown';
            });

        // Dynamically determine the input type (replace with your own logic)
        const inputTypePromise = new Promise((resolve) => {
            // Replace this with your logic to determine the input type
            const inputType = 'keyboard';
            resolve(inputType);
        });

        // Dynamically fetch the country and country code using ipapi.co
        const countryInfoPromise = fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                return {
                    country: data.country_name || 'Unknown',
                    countryCode: data.country || 'Unknown'
                };
            })
            .catch(error => {
                console.error('Error fetching country information:', error);
                return {
                    country: 'Unknown',
                    countryCode: 'Unknown'
                };
            });

        // Combine the promises and return both device and country information
        return Promise.all([deviceAddressPromise, inputTypePromise, countryInfoPromise])
            .then(([deviceAddress, inputType, countryInfo]) => {
                const deviceInfo = {
                    os: getOsInfo(navigator.platform).name,
                    browser: getBrowserInfo(userAgent).name,
                    version: getBrowserInfo(userAgent).version,
                    userAgent: userAgent,
                    inputType: inputType,
                    deviceAddress: deviceAddress
                };
                return { deviceInfo, countryInfo };
            })
            .catch(error => {
                console.error('Error getting device information:', error);
                return { error: 'Error' };
            });
    } else {
        return { error: "Navigator object not available (not in a browser environment)." };
    }
}


function getBrowserInfo(userAgent) {
    // Detect Chrome
    if (/Chrome/.test(userAgent)) {
        const chromeVersion = userAgent.match(/Chrome\/(\d+)/)[1];
        return { name: "Chrome", version: chromeVersion };
    }

    // Detect Firefox
    if (/Firefox/.test(userAgent)) {
        const firefoxVersion = userAgent.match(/Firefox\/(\d+)/)[1];
        return { name: "Firefox", version: firefoxVersion };
    }

    // Detect Safari
    if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
        const safariVersion = userAgent.match(/Version\/(\d+)/)[1];
        return { name: "Safari", version: safariVersion };
    }

    // Detect Edge (Chromium)
    if (/Edg/.test(userAgent)) {
        const edgeVersion = userAgent.match(/Edg\/(\d+)/)[1];
        return { name: "Edge", version: edgeVersion };
    }

    // Add more browser detections as needed...

    // If the browser is not detected, return unknown
    return { name: "Unknown", version: "Unknown" };
}


function getOsInfo(platform) {
    // Detect Windows
    if (/Win/.test(platform)) {
        const versionMatch = platform.match(/Windows NT (\d+\.\d+)/);
        const version = versionMatch ? versionMatch[1] : "Unknown";
        return { name: "Windows", version };
    }

    // Detect macOS
    if (/Mac/.test(platform)) {
        return { name: "macOS", version: "Unknown" };
    }

    // Add more OS detections as needed...

    // If the OS is not detected, return unknown
    return { name: "Unknown", version: "Unknown" };
}



export default getDeviceInfo;