// // components/MarkerInfoWindowNext.js
// import React, { useEffect, useState } from 'react';
// import isEmpty from 'lodash.isempty';
// import GoogleMap from './GoogleMap';
// import { useRouter } from "next/router";







// // const handleApiLoaded = (map, maps, places) => {
// //     const markers = [];
// //     const infowindows = [];

// //     places.forEach((place) => {
// //         markers.push(new maps.Marker({
// //             position: {
// //                 lat: place.lat,
// //                 lng: place.lng,
// //             },
// //             map,
// //         }));

// //         infowindows.push(new maps.InfoWindow({
// //             content: getInfoWindowString(place),
// //         }));
// //     });

// //     markers.forEach((marker, i) => {
// //         marker.addListener('mouseover', () => {
// //             infowindows[i].open(map, marker);
// //         });

// //         marker.addListener('mouseout', () => {
// //             infowindows[i].close();
// //         });
// //     });
// // };




// const MarkerInfoWindowNext = (props) => {
//     const coordinatesData = props.data;
//     const [places, setPlaces] = useState(null);
//     console.log(coordinatesData)
//     const [openInfoWindow, setOpenInfoWindow] = useState(null);

//     const getInfoWindowString = (place) => {
//         return `
//         <div>
//             <img src="${place.image}" alt="${place.name}" style="width: 50px; height: 50px;" />
//             <p style="cursor: pointer;"><a href="${place.url}">${place.name}</a></p>
//         </div>
//     `;
//     };


//     useEffect(() => {
//         setPlaces(coordinatesData);
//     }, [coordinatesData]);


//     const handleApiLoaded = (map, maps, places) => {
//         const markers = [];
//         const infowindows = [];

//         places.forEach((place) => {
//             const marker = new maps.Marker({
//                 position: {
//                     lat: place.lat,
//                     lng: place.lng,
//                 },
//                 map,
//             });
//             console.log(place);
//             const infowindow = new maps.InfoWindow({
//                 content: getInfoWindowString(place),
//             });

//             marker.addListener('mouseover', () => {
//                 // Close the previous info window, if any
//                 if (openInfoWindow) {
//                     openInfoWindow.close();
//                 }

//                 // Open the current info window
//                 infowindow.open(map, marker);
//                 setOpenInfoWindow(infowindow);
//             });

//             markers.push(marker);
//             infowindows.push(infowindow);
//         });
//     };


//     return (
//         <>
//             {!isEmpty(places) && (
//                 <GoogleMap
//                     defaultZoom={1}
//                     defaultCenter={coordinatesData[0]}
//                     bootstrapURLKeys={{ key: "AIzaSyDIZK8Xr6agksui1bV6WjpyRtgtxK-YQzE" }}
//                     yesIWantToUseGoogleMapApiInternals
//                     onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
//                 />
//             )}
//         </>
//     );
// };

// export default MarkerInfoWindowNext;

// components/MarkerInfoWindowNext.js
import React, { useEffect, useState, useRef } from 'react';
import isEmpty from 'lodash.isempty';
import GoogleMap from './GoogleMap';
import { useRouter } from 'next/router';

const MarkerInfoWindowNext = (props) => {
    const coordinatesData = props.data;
    const [places, setPlaces] = useState(null);
    const router = useRouter();

    const openInfoWindowRef = useRef(null);

    const getInfoWindowString = (place) => {
        return `
        <div>
            <img src="${place.image}" alt="${place.name}" style="width: 50px; height: 50px;" />
            <p style="cursor: pointer;"><a href="${place.url}">${place.name}</a></p>
        </div>
    `;
    };

    useEffect(() => {
        setPlaces(coordinatesData);
    }, [coordinatesData]);

    const handleApiLoaded = (map, maps, places) => {
        const markers = [];

        places.forEach((place) => {
            const marker = new maps.Marker({
                position: {
                    lat: place.lat,
                    lng: place.lng,
                },
                map,
            });

            const infowindow = new maps.InfoWindow({
                content: getInfoWindowString(place),
            });

            marker.addListener('mouseover', () => {
                // Close the previous info window, if any
                if (openInfoWindowRef.current) {
                    openInfoWindowRef.current.close();
                }

                // Open the current info window
                infowindow.open(map, marker);

                // Update the ref to the current info window
                openInfoWindowRef.current = infowindow;
            });

            markers.push(marker);
        });
    };

    return (
        <>
            {!isEmpty(places) && (
                <GoogleMap
                    defaultZoom={1}
                    defaultCenter={coordinatesData[0]}
                    bootstrapURLKeys={{ key: 'AIzaSyDIZK8Xr6agksui1bV6WjpyRtgtxK-YQzE' }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
                />
            )}
        </>
    );
};

export default MarkerInfoWindowNext;


