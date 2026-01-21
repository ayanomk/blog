export const mockData = [
    {
        id: 1,
        tripId: "the-ghan-2025",
        day: 1,
        title: "The Ghan",
        description: "First day of The Ghan journey. Boarded the train in Adelaide and headed non-stop to Marla.", // Lots of amazing views, delicious food, and free wines to enjoy the ride.Ending the day in a cosy cabin for a sleep as thunder rolled outside.",
        city: "Adelaide",
        country: "Australia",
        region: "Oceania", 
        lat: -34.9285, 
        lng: 138.6007,
        year: 2025,
        month: 11,
        date: 23,
        hero: "/img/DSCF1375.JPG",
        sections: [
            {
                section: "Information",
                sectionType: "info",
                subsections: [
                    {
                        title: "Schedule of the Day",
                        blocks: [
                            {
                                type: "table",
                                headers: ["Time", "Activity"],
                                rows: [
                                    ["10:00", "Arrive at Adelaide Parklands Terminal"],
                                    ["11:30", "Board train"],
                                    ["12:15", "Departure"],
                                    ["13:30", "Lunch"],
                                    ["19:15", "Dinner"]
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                section: "The Day",
                sectionType: "content",
                subsections: [
                    {
                        title: "Morning",
                        blocks: [
                            {
                                type: "text",
                                content: "We left Tonsley at around 9:30 so that we can reach Adelaide Parklands Terminal 2 hours before departure, just as we were instructed on the travel document. When we got there, a lot of people were queuing up for check in and even more people were chilling in the lounge. Once we checked in, we got a welcome drink (tea) with a couple of muffins and relaxed for a bit."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/IMG_4827.jpeg",
                            },
                            {
                                type: "text",
                                content: "At 11:30, we headed to our car K and got on board to our room No.2. It was very compact but cute and we had our individual bathroom."
                            },
                            {
                                type: "img",
                                dir: "imgV3",
                                src: "/img/IMG_4803.jpeg"
                            },
                            {
                                type: "img",
                                dir: "imgV3",
                                src: "/img/IMG_4801.jpeg"
                            },
                            {
                                type: "img",
                                dir: "imgV3",
                                src: "/img/IMG_4799.jpeg"
                            },
                            {
                                type: "text",
                                content: "The Lounge car was full of sofas and small tables with a bar at the end. We sat in the lounge and waited for the departure."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/DSCF1377.JPG"
                            }
                        ]
                    },
                    {
                        title: "Afternoon",
                        blocks: [
                            {
                                type: "text",
                                content: "A lot of people were in the Lounge car with wines or beers they got from the bar and chatting and greeting. I felt a little out of place since we were the only Asians and I was by far the youngest (I think the youngest I saw were maybe mid 30s?). I’m not fully sure but the train cars were separated into maybe 4 sections: Platinum, Gold Premium, Gold Twin, Gold Single. I think the Gold Twin carriages were K, J, I, H (At least those were the carriages that we shared the same Lounge car and Dining car with). So the people we mingled mostly with are from this section. I wonder if it was different if I had been with Gold Single where all solo travellers gather."
                            },
                            {
                                type: "text",
                                content: "The train was too long that it was separated into two platforms: the head cars in Platform 1 (including our car K), and the tail cars in Platform 2. As ours were in Platform 1, our side of the train moved out of the platform and reversed into Platform 2 to connect the whole train. It was a unique way of doing it but I guess it’s better than having people walk a single long platform. "
                            },
                            {
                                type: "text",
                                content: "I’ve never been to the north side of Adelaide so it was nice to see the scenary. It was pretty much just suburbs and then farms and small towns."
                            },
                            {
                                type: "text",
                                content: "Our lunch was at 13:30 and it was on the dining car called Queen Adelaide Restaurant. We sat on the window side and shared the table with an elderly couple from Perth. I wasn’t aware that we were supposed to share a table… I was freaking out and nervous that I couldn’t fully enjoy the meal. I had a glass of moscato, pumpkin bread, grilled chicken breast & quinoa salad with pistachio pesto, and chocolate & mandarin delice. The main was very filling and I quite liked the pistachio pesto. The dessert looked luxurious with cube shaped chocolate mouse with mandarin mouse in the middle."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/DSCF1381.JPG"
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/DSCF1382.JPG"
                            },
                            {
                                type: "text",
                                content: "After lunch, I was exhausted from socialising and just chilled in our little cabin. Also, I was feeling a little panicky since I was stuck in a confined small space and was on the edge of getting a motion sickness…"
                            },     
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/IMG_4761_edit.jpeg"
                            },
                        ]
                    },
                    {
                        title: "Evening",
                        blocks: [
                            {
                                type: "text",
                                content: "We headed to the Queen Adelaide Restaurant at 19:15 for dinner. This time we sat on the corridor side and shared the table with an elderly couple from the Netherlands. I got a moscato again, kangaroo meat with beetroot, steak for main, and eton mess.The kangaroo meat was a lot tender than I expected."
                            },
                            {
                                type: "img",
                                dir: "imgV3",
                                src: "/img/IMG_4763.jpeg"
                            },
                            {
                                type: "img",
                                dir: "imgV3",
                                src: "/img/IMG_4765.jpeg"
                            },
                            {
                                type: "img",
                                dir: "imgV3",
                                src: "/img/IMG_4766.jpeg"
                            },
                            {
                                type: "text",
                                content: "After dinner, we headed back to our cabin, where it was turned into bunk beds."
                            },
                            {
                                type: "text",
                                content: "There were lightnings outside and it was fun watching that from our space. I even succeeded in getting a photo of it! We were also able to see the stars too. That pretty much concluded the day, although it took me a while to fall asleep with the rough train motion."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/DSCF1387_edit.JPG"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        tripId: "the-ghan-2025",
        day: 2,
        title: "The Ghan",
        description: "Woke up to a beautiful sunrise at Marla. Off to Alice Springs for a walk at the Standley Chasm.", // Lots of amazing views, delicious food, and free wines to enjoy the ride.Ending the day in a cosy cabin for a sleep as thunder rolled outside.",
        city: "Alice Springs",
        country: "Australia",
        region: "Oceania", 
        lat: -23.6980, 
        lng: 133.8807,
        year: 2025,
        month: 11,
        date: 24,
        hero: "/img/DSCF1416.JPG",
        sections: [
            {
                section: "Information",
                sectionType: "info",
                subsections: [
                    {
                        title: "Schedule of the Day",
                        blocks: [
                            {
                                type: "table",
                                headers: ["Time", "Activity"],
                                rows: [
                                    ["05:45", "Arrive at Marla"],
                                    ["06:00", "Off train"],
                                    ["06:30", "Sun rise at Marla"],
                                    ["08:00", "Departure"],
                                    ["10:00 (NT time)", "Brunch"],
                                    ["14:00", "Arrive at Alice Springs station"],
                                    ["15:00", "Arrive at Standley Chasm"],
                                    ["17:30", "Arrive back at Alice Springs station"],
                                    ["18:00", "Departure"],
                                    ["19:15", "Dinner"],
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                section: "The Day",
                sectionType: "content",
                subsections: [
                    {
                        title: "Morning",
                        blocks: [
                            {
                                type: "text",
                                content: "Yesterday before departure when our cabin crew gave us a quick welcome + journey orientation, he asked if we wanted a knock on our door when we arrive at Marla to see the sunrise. So we got a knock at 5:45 but we actually woke up at around 5:00. I’m not sure what time we arrived at Marla but by 5:00 we were already there. Quite a lot of people were waiting in the Lounge car waiting for the door to open."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/DSCF1401.JPG"
                            },
                            {
                                type: "text",
                                content: "It was nice to be off the train and breathing the fresh air after a long ride. The sun was getting close to the horizon and it was fairly bright with orange tint on the sky. There was a simple breakfast provided outside like coffee, tea, spinach and feta roll, and bacon and egg mini burger. There were benches and even camp fires."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/DSCF1449.JPG"
                            },
                            {
                                type: "text",
                                content: "It wasn’t the best sunrise partly because the horizon was a bit hidden by the trees and it was a little cloudy. But it was still definitely worth it. I really liked how the train was lit with orange. Also, standing on the red dirt of the outback! To be honest, I thought the outback of Australia would be more of a desert, like purely just red dirt, but there were a lot more trees and bushes."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/DSCF1431.JPG"
                            },
                            {
                                type: "text",
                                content: "The only thing that was unfortunate at Marla was that we weren’t allowed to go to the head of the train… I really wanted to take a photo of that red Ghan in this red dirt…"
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/DSCF1454.JPG"
                            },
                            {
                                type: "text",
                                content: "Although the departure was at 8:00, everyone pretty much got back to their cabin at around 7:00. We chilled in out cabin untill brunch. Just before brunch, we were expecting to cross the border between South Australia and Northern Territory and we managed to get a glimpse of it."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/IMG_4768.jpeg"
                            },
                            {
                                type: "text",
                                content: "It was really hard because it was scehduled to pass at around 10:00 but it’s not that accurate and we couldn’t keep staring out the window the whole time. Now that we crossed the border, it means we go back in time by 1 hour since NT is 1 hour behind SA. So the brunch was between 10:00 to 13:00 and we planned to go around 11:00 but in NT time, that became 10:00."
                            },
                            {
                                type: "text",
                                content: "We shared a table with the Dutch couple (same from last night). I had Grilled Halloumi with Avocado & Kale for main and Apricot Cranberry & Poppyseed Toast for dessert. The halloumi had ancient grain wich made it very filling. The sauce was interesting with a vinegar (probably balsamic) but it kind of killed the flavour halloumi. I still enjoyed it very much. The dessert was like french toast and it was amazing."
                            },
                            {
                                type: "img",
                                dir: "imgV2",
                                src: "/img/IMG_4771.jpeg"
                            },
                            {
                                type: "img",
                                dir: "imgV2",
                                src: "/img/IMG_4772.jpeg"
                            }
                        ]
                    },
                    {
                        title: "Afternoon",
                        blocks: [
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/DSCF1490.JPG"
                            },
                            {
                                type: "text",
                                content: "We arrived at Alice Springs at around 14:00. The weather wasn’t super dry nor super humid but ridiculously hot and the UV light was strong. We chose Standly Chasm tour for our Off Train Experience and the bus ride took around 40 minutes. On the way, we got to see the town of Alice Springs, and passed by the Desert Park and the Simpsons Gap (although we only passed the roads leading to them). The area was more surrounded with mountains and there were more trees and bushes than I expected."
                            },
                            {
                                type: "text",
                                content: "Once we got to the entrance of hiking trail to Standley Chasm, we greeted the local guide and he led us through. The Standley Chasm wasn’t as big as I expected, it was just a small section and more wider… This area did remind me of Big Thunder Mountain at Disney Land, probably because of the rockiness and the colour."
                            },
                            {
                                type: "img",
                                dir: "imgV2",
                                src: "/img/DSCF1475.JPG"
                            },
                            {
                                type: "img",
                                dir: "imgV2",
                                src: "/img/DSCF1480.JPG"
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/DSCF1457.JPG"
                            },
                            {
                                type: "text",
                                content: "After the hiking, they prepared scones for us at the little cafe there. It wasn’t as good as the british scones but it was still nice."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/IMG_4775.jpeg"
                            },
                            {
                                type: "text",
                                content: "After a little rest, there was a cultural talk by a local aboriginal (Arrernte Tribal) about their skin name system. Because he simplified it for us, it made sense and I can understand how logical it is and how it supports the relationship between each other. When I learnt about this, I got mixed feelings because on one side it is the easiest way to strengthen the tribe but also, on the other side it’s restricting and not necessary nowadays. Either way, it was interesting to learn about this."
                            },
                            {
                                type: "img",
                                dir: "imgV3",
                                src: "/img/skin_name.png"
                            },
                            {
                                type: "text",
                                content: "We hopped on the bus and headed back to Alice Springs station. The station was very small but since there are people who gets on/off here, there was a gift shop, where they sold The Ghan merch at cheaper price. I ended buying the water bottle and a pin."
                            }
                        ]
                    },
                    {
                        title: "Evening",
                        blocks: [
                            {
                                type: "text",
                                content: "The train left Alice Springs at around 18:00. Since we still had some time until dinner, I got myself a glass of Baileys and chilled in the Lounge Car with a book. It was great. Just before heading to dinner, we saw a beautiful sunset. To be honest it was a lot more red and vibrant than the sunrise we saw at Marla. Plus once the sun set, the sky was pinkish purple. I really wished we could stop and and step off the train to see the sun set."
                            },
                            {
                                type: "text",
                                content: "For dinner, we shared a table with a couple from Newcastle (NSW). I got a glass of Jim Beam Bourbon, Crocodile Dumplings, Slow Braised Beef for main, and Molten Chocolate Cake. It was my first time trying bourbon and I could drink it but not my favourite. I could taste the sweetness but the after tase was still bitter and dry for me. The crocodile meat felt a bit like a white meat fish, flakey and a bit fluffy, but I still liked it a lot. The beef was super tender and delicious. The chocolate cake was disappointing because it wasn’t gooey in the middle and no chocolate lava came out."
                            },
                            {
                                type: "img",
                                dir: "imgV3",
                                src: "/img/IMG_4780.jpeg"
                            },
                            {
                                type: "img",
                                dir: "imgV3",
                                src: "/img/IMG_4781.jpeg"
                            },
                            {
                                type: "img",
                                dir: "imgV3",
                                src: "/img/IMG_4782.jpeg"
                            },
                            {
                                type: "text",
                                content: "After dinner, I got a glass of Bundaberg Rum from the Lounge car bar. I found out that rum isn’t for me, it wasn’t sweet at all and just dry."
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        tripId: "the-ghan-2025",
        day: 3,
        title: "The Ghan",
        description: "Final day on the Ghan. Made the most out of it by eating, drinking, and crusing the Katherine Gorge.", // Lots of amazing views, delicious food, and free wines to enjoy the ride.Ending the day in a cosy cabin for a sleep as thunder rolled outside.",
        city: "Katherine",
        country: "Australia",
        region: "Oceania", 
        lat: -14.4520, 
        lng: 132.2699,
        year: 2025,
        month: 11,
        date: 25,
        hero: "/img/DSCF1509.JPG",
        sections: [
            {
                section: "Information",
                sectionType: "info",
                subsections: [
                    {
                        title: "Schedule of the Day",
                        blocks: [
                            {
                                type: "table",
                                headers: ["Time", "Activity"],
                                rows: [
                                    ["06:30", "Breakfast"],
                                    ["09:00", "Arrive at Katherine station"],
                                    ["13:00", "Return from Katherine Gorge"],
                                    ["13:15", "Departure"],
                                    ["14:30", "Lunch"],
                                    ["17:00", "Arrive at Darwin station"],
                                    ["18:00", "Bus to Darwin city"],
                                    ["18:40", "Arrive at hotel"],
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                section: "The Day",
                sectionType: "content",
                subsections: [
                    {
                        title: "Morning",
                        blocks: [
                            {
                                type: "text",
                                content: "We woke up early at around 5:30 to try and see the sunrise from our cabin window but it wasn’t as great as the one we saw at Marla. We headed to breakfast at around 6:30 and we shared a table with the husband of the cruise couple (from last night, the wife was asleep). I got an apple juice, Tropical Fruit & Natural Yoghurt Parfait, and Full Breakfast."
                            },
                            {
                                type: "img",
                                dir: "imgV3",
                                src: "/img/IMG_4788.jpeg"
                            },
                            {
                                type: "img",
                                dir: "imgV3",
                                src: "/img/IMG_4790.jpeg"
                            },
                            {
                                type: "img",
                                dir: "imgV3",
                                src: "/img/IMG_4791.jpeg"
                            },
                            {
                                type: "text",
                                content: "The view from the window has somewhat changed and there were more bushes and trees with red dirt. We saw some controlled fires to keep the grass from invading the railway and I guess to prevent bush fire from spreading."
                            },
                            {
                                type: "text",
                                content: "Before arriving at Katherine, I tried a glass of Kahlua milk for the first time from the Lounge car bar. I did not taste any alcohol and it was just a sweet weak milk coffee (ミルメーク　コーヒー) so it was easy to drink but I prefer Baileys. I had a nice chat with the bartender about his work and the other trains. According to him, the Indian Pacific has the longest time on the train, the Great Southern has the most time on the off train experience (even lunch is off train), and the Ghan has the best balance of both. I’m not sure if I’ll ever do them since they’ll exhaust me from socialising. But I do enjoy occasionally chatting with strangers or just reading on the train. If only I didn’t have my lingering coughing from the flu…"
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/IMG_4792.jpeg"
                            },
                            {
                                type: "text",
                                content: "At Katherine station, we hopped on a bus and headed to the Nitmiluk Gorge. On the boat, we sat at the very front so the view was great but the sun light was intense. It was a nice little boat ride, and kind of reminded me of the Milford Sound in NZ, minus the greenary and plus the heat. The gorge is made up of 13 gorges and we were supposed to go through the first and second but unfortunately due to the water level being high? we were only able to go through the first one. Maybe because it was still the first gorge, the area felt a little open to me. But I still enjoyed the scenary with all the rocky walls."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/DSCF1533.JPG"
                            },
                            {
                                type: "text",
                                content: "We even got to see a cave art and a crocodile! The boat driver taught us about saltwater crocodiles (salties) and freshwater crocodiles (freshies). Since this is a gorge, it is freshies' natural habitat but every now and again the salties come up and cause problems. Apparently the freshies are more nice and they won’t attack and would rather stay away from you, but the salties are vicious and they will attack everyone including the freshies."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/DSCF1529.JPG"
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/DSCF1545.JPG"
                            },
                            {
                                type: "text",
                                content: "It actually felt like riding a jungle cruise, so I guess the area is more like a jungle than a desert. The only thing that was missing is the boat driver shooting and fighting the salties with a gun."
                            }
                        ]
                    },
                    {
                        title: "Afternoon",
                        blocks: [
                            {
                                type: "text",
                                content: "We got back to the Katherine station around midday. The station didn’t have anything since no one gets on or off at this station so we got straight on the train and relaxed until lunch. We had the table just to ourselves for the final meal on the train. I had Bethany Late Harvest Riesling (sweet wine), Grilled Tropical Chicken Salad, and Caramelised Pineapple in a Native Lemon Myrtle Syrup. Personally it was the least exciting meal we’ve had on the train but at least I could eat it without the pressure of having to have a conversation with strangers. I chose the wine which the cabin crew said was the sweetest and it was but felt a little dry (or refreshing?) than moscato."
                            },
                            {
                                type: "img",
                                dir: "imgV2",
                                src: "/img/IMG_4796.jpeg"
                            },
                            {
                                type: "img",
                                dir: "imgV2",
                                src: "/img/IMG_4798.jpeg"
                            },
                            {
                                type: "text",
                                content: "Afterwards, we stayed in the Lounge car. Surprisingly it wasn’t crowded. I thought most people will be here for one last time but I guess they prefer to stay in their own little cabin. NT is currently in the wet season (Nov - Apr) so it’s more of a tropical summer and I could see that from the scenary with all the mountains, trees, and the colour of green (it’s more the dark wet green). It was interesting to see the changes from SA to NT. We also got to see the Darwin city when we crossed the Fergusson River bridge, which was really nice."
                            },
                            {
                                type: "text",
                                content: "The bar was closing at 16:00 so I grabbed myself a one last glass of Baileys (although an elderly man sitting near us suggested I should get Kahlua milk). The first day on the train felt like it was going to be a long journey but on the last day it felt like the time passed by so quickly and I was running out of time to enjoy this."
                            },
                            {
                                type: "text",
                                content: "Just before arriving at Darwin, we were sent back to our cabins from the Lounge car. As we were packing, our cabin crew came in to say goodbye. At the Darwin station, we hopped on the bus to get to the city, which was about 17.5km away."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/IMG_4804.jpeg"
                            }
                        ]
                    },
                    {
                        title: "Evening",
                        blocks: [
                            {
                                type: "text",
                                content: "The Cavenagh hotel wasn’t the best mostly because the air conditioner wasn’t working and it was super hot and humid. For our dinner, we just bought some food from Coles and had it at our hotel room."
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        tripId: "pink-lake-dimboola-2025",
        title: "Pink Lake Dimboola",
        description: "I really wanted to see the pink salt lake but was it worth walking 4 hours? Pretty coloured lake but it was a terrifying journey.", // Lots of amazing views, delicious food, and free wines to enjoy the ride.Ending the day in a cosy cabin for a sleep as thunder rolled outside.",
        city: "Dimboola",
        country: "Australia",
        region: "Oceania", 
        lat: -36.4555, 
        lng: 142.0275,
        year: 2025,
        month: 12,
        date: 21,
        hero: "/img/DSCF1726.JPG",
        sections: [
            {
                section: "Information",
                sectionType: "info",
                subsections: [
                    {
                        title: "Schedule of the Day",
                        blocks: [
                            {
                                type: "table",
                                headers: ["Time", "Activity"],
                                rows: [
                                    ["07:55", "Departure from Southern Cross station"],
                                    ["10:24", "Arrive at Ararat station"],
                                    ["10:34", "Departure from Ararat station"],
                                    ["12:49", "Arrive at Dimboola city"],
                                    ["13:15", "Start the walk"],
                                    ["15:15", "Arrive at Pink Lake"],
                                    ["16:30", "Start the walk back"],
                                    ["18:30", "Arrive at hotel"],
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                section: "The Day",
                sectionType: "content",
                subsections: [
                    {
                        title: "Morning",
                        blocks: [
                            {
                                type: "text",
                                content: "The distance between Melbourne and Dimboola is about 335km and since it'll be a regional, there aren't many buses running each day. So we hopped on the 07:55am VLine to Ararat as the bus to Dimboola will be departing from there. Getting to Ararat isn't too bad, it's from there that gets tricky... We only needed to wait for 10 minutes to get on the bus so the connection was very convenient. And after stopping at towns like Horsham (that's another horrifying story to tell from the Overland train journey), we arrived at Dimboola by noon."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/IMG_5017.jpeg"
                            },
                        ]
                    },
                    {
                        title: "Afternoon",
                        blocks: [
                            {
                                type: "text",
                                content: "I did expect Dimboola to be a very small town but it was on another level. There was a supermarket but it was only open from 09:00am to 12:00pm (on Sunday). The roads were wide but there were no cars nor pedestrians but thankfully? there were people at the hotel bar that we were staying. Soon after checking in, we started our 2 hour walk to the pink lake."
                            },
                            {
                                type: "text",
                                content: "The path was not walkable and when I say path, there was no pavement once we were outside of the town. So we were basically just walking on a motorway (A8 road). There were side roads on some of the areas so we did walk those instead but it still wasn't a pleasant experience. However, we did have some luck and the sky was cloudy while we were walking, protecting us from the sun. Regardless it was still very hot and the flies were annoying but better than to be walking with extreme direct sun."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/IMG_5016.jpeg"
                            },
                            {
                                type: "text",
                                content: "After what felt like forever, we finally reached the pink lake! And even the sun came out. It probably wasn't the most pink colour you could get but it was still very pretty and with the sun, the salt was glittering and it was very much worth it."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/IMG_5012.jpeg"
                            },
                            {
                                type: "text",
                                content: "If I could have stayed there longer I would have but, considering we need to walk back again for 2 hours and I was already quite exhausted from walking there, we headed back. If the path was walkable, I probably wouldn't have hated it this much. I did manage to find an alternative slightly more walkable but longer path on the way back and that wasn't too bad (until we hit a dead end at one point and had to walk through a bush). It was also funny how we crossed a railway which we used few days early when we travelled between Melbourne and Adelaide with The Overland."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/IMG_5013.jpeg"
                            }
                        ]
                    },
                    {
                        title: "Evening",
                        blocks: [
                            {
                                type: "text",
                                content: "We made it back to the hotel in Dimboola safe and sound and I just collapsed on the bed. But I was also hungry so we had a dinner at the hotel restaurant and went to bed early."
                            },
                            {
                                type: "img",
                                dir: "imgH",
                                src: "/img/IMG_5024.jpeg"
                            },
                            {
                                type: "text",
                                content: "The following day, we took the 05:38am bus to Ballarat then 09:24 train to Southern Cross so we could be back in a big city that we love well before noon."
                            }
                        ]
                    }
                ]
            }
        ]
    }
]