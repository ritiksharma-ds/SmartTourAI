/* ==========================================
   SMARTTOUR AI - COMPLETE JAVASCRIPT
========================================== */


/* ==========================================
   1. SMOOTH SCROLL
========================================== */

function scrollToPlaces() {
    const places = document.getElementById("places");
    if (places) places.scrollIntoView({ behavior: "smooth" });
}

function scrollToRoute() {
    const route = document.getElementById("route");
    if (route) route.scrollIntoView({ behavior: "smooth" });
}


/* ==========================================
   2. TOURIST PLACES GRAPH
========================================== */

const graph = {
    "India Gate": {
        "Red Fort": 4,
        "Humayun's Tomb": 6
    },

    "Red Fort": {
        "India Gate": 4,
        "Qutub Minar": 5,
        "Humayun's Tomb": 7
    },

    "Qutub Minar": {
        "Red Fort": 5,
        "Humayun's Tomb": 8
    },

    "Humayun's Tomb": {
        "India Gate": 6,
        "Red Fort": 7,
        "Qutub Minar": 8
    }
};


/* ==========================================
   3. DIJKSTRA
========================================== */

function dijkstra(graph, start, end) {

    const distances = {};
    const previous = {};
    let unvisited = [];

    for (const node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
        unvisited.push(node);
    }

    if (!(start in distances) || !(end in distances)) return null;

    distances[start] = 0;

    while (unvisited.length) {

        let current = unvisited.reduce((minNode, node) => {

            if (
                minNode === null ||
                distances[node] < distances[minNode]
            ) {
                return node;
            }

            return minNode;

        }, null);

        if (
            current === null ||
            distances[current] === Infinity
        ) {
            break;
        }

        unvisited = unvisited.filter(
            node => node !== current
        );

        if (current === end) break;

        for (const neighbour in graph[current]) {

            const distance =
                distances[current] +
                graph[current][neighbour];

            if (distance < distances[neighbour]) {

                distances[neighbour] = distance;
                previous[neighbour] = current;

            }
        }
    }

    const path = [];
    let currentNode = end;

    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
    }

    if (
        path.length === 1 &&
        path[0] !== start
    ) {
        return null;
    }

    return {
        distance: distances[end],
        path
    };
}


/* ==========================================
   4. FIND ROUTE
========================================== */

function findRoute() {

    const startElement =
        document.getElementById("startLocation");

    const destinationElement =
        document.getElementById("destination");

    const result =
        document.getElementById("routeResult");

    if (!startElement || !destinationElement || !result) {
        return;
    }

    const start = startElement.value;
    const destination = destinationElement.value;

    if (!start || !destination) {

        result.innerHTML = `
            <div class="algorithm-badge">⚠️ Required</div>
            <div>
                <h3>Please select both locations</h3>
                <p>Choose starting point and destination.</p>
            </div>
        `;

        return;
    }

    if (start === destination) {

        result.innerHTML = `
            <div class="algorithm-badge">ℹ️ Notice</div>
            <div>
                <h3>Same location selected</h3>
                <p>Please choose a different destination.</p>
            </div>
        `;

        return;
    }

    const route = dijkstra(
        graph,
        start,
        destination
    );

    if (!route) {

        result.innerHTML = `
            <div class="algorithm-badge">❌ No Route</div>
            <div>
                <h3>No route found</h3>
                <p>Try selecting different locations.</p>
            </div>
        `;

        return;
    }

    const time = Math.ceil(route.distance * 3);

    result.innerHTML = `
        <div class="algorithm-badge">⚡ Dijkstra</div>
        <div>
            <h3>${route.path.join(" → ")}</h3>
            <p>
                📍 Distance: ${route.distance} km
                &nbsp; • &nbsp;
                ⏱ Estimated Time: ${time} min
            </p>
        </div>
    `;

    result.style.opacity = "0";

    setTimeout(() => {

        result.style.transition =
            "opacity 0.4s ease";

        result.style.opacity = "1";

    }, 50);
}


/* ==========================================
   5. RECOMMENDATIONS
========================================== */

const recommendations = {

    History: [
        "Taj Mahal",
        "Red Fort",
        "Qutub Minar",
        "Humayun's Tomb"
    ],

    Nature: [
        "Mehtab Bagh",
        "Sunder Nursery",
        "India Gate Lawns"
    ],

    Food: [
        "Chandni Chowk",
        "Connaught Place",
        "Khan Market"
    ],

    Shopping: [
        "Dilli Haat",
        "Sarojini Nagar",
        "Janpath Market"
    ],

    Culture: [
        "Qutub Minar",
        "Red Fort",
        "Humayun's Tomb"
    ]
};


/* ==========================================
   6. INTEREST CARDS
========================================== */

function initializeInterestCards() {

    document
        .querySelectorAll(".interest-card")
        .forEach(card => {

            card.addEventListener("click", function () {

                const strong =
                    this.querySelector("strong");

                if (!strong) return;

                const interest =
                    strong.textContent.trim();

                const places =
                    recommendations[interest];

                if (!places) return;

                const oldResult =
                    document.querySelector(
                        ".recommendation-result"
                    );

                if (oldResult) {
                    oldResult.remove();
                }

                const result =
                    document.createElement("div");

                result.className =
                    "recommendation-result";

                result.innerHTML = `
                    <div class="recommendation-header">
                        <div>
                            <small>
                                SMARTTOUR AI RECOMMENDS
                            </small>

                            <h3>
                                Best places for ${interest}
                            </h3>
                        </div>

                        <span>✨</span>
                    </div>

                    <div class="recommendation-list">

                        ${places.map((place, index) => `
                            <div class="recommendation-place">

                                <span>${index + 1}</span>

                                <strong>${place}</strong>

                                <small>
                                    Recommended for ${interest}
                                </small>

                            </div>
                        `).join("")}

                    </div>
                `;

                const grid =
                    document.querySelector(
                        ".interest-grid"
                    );

                if (!grid) return;

                grid.after(result);

                setTimeout(() => {

                    result.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 100);
            });
        });
}


/* ==========================================
   7. VIEW ALL
========================================== */

function initializeViewAll() {

    const button =
        document.querySelector(".view-all");

    if (!button) return;

    button.addEventListener("click", () => {

        window.location.href =
            "pages/all-destinations.html";

    });
}


/* ==========================================
   8. NAVBAR
========================================== */

function initializeNavbar() {

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );

    window.addEventListener(
        "scroll",
        function () {

            let currentSection = "";

            document
                .querySelectorAll("section")
                .forEach(section => {

                    const top =
                        section.offsetTop - 120;

                    if (window.scrollY >= top) {

                        currentSection =
                            section.getAttribute("id");

                    }
                });

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    "#" + currentSection
                ) {
                    link.classList.add("active");
                }

            });

        }
    );
}


/* ==========================================
   9. SEARCH
========================================== */

function searchPlaces() {

    const input =
        document.getElementById("placeSearch");

    if (!input) return;

    const value =
        input.value
            .toLowerCase()
            .trim();

    const cards =
        document.querySelectorAll(
            ".destination-card"
        );

    const listItems =
        document.querySelectorAll(
            ".destination-list-item"
        );

    let found = false;

    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        const show =
            !value ||
            text.includes(value);

        card.style.display =
            show ? "" : "none";

        if (show) found = true;
    });

    listItems.forEach(item => {

        const text =
            item.innerText.toLowerCase();

        const show =
            !value ||
            text.includes(value);

        item.style.display =
            show ? "" : "none";

        if (show) found = true;
    });

    let message =
        document.getElementById(
            "searchMessage"
        );

    if (!message) {

        message =
            document.createElement("p");

        message.id =
            "searchMessage";

        const grid =
            document.querySelector(
                ".destination-grid"
            );

        if (grid) {
            grid.after(message);
        }
    }

    if (value && !found) {

        message.textContent =
            `No destinations found for "${value}" 😕`;

    } else {

        message.textContent = "";

    }
}


/* ==========================================
   10. IMAGE HELPERS
========================================== */

function createSafeImage(src, alt, className = "") {

    const img =
        document.createElement("img");

    img.src = src;
    img.alt = alt;

    if (className) {
        img.className = className;
    }

    img.loading = "lazy";
    img.decoding = "async";
    img.draggable = false;

    return img;
}


/* ==========================================
   11. DESTINATION GALLERY
========================================== */

let currentGallery = [];
let currentGalleryIndex = 0;

function getGalleryForDestination(place) {

    const destination =
        destinations.find(
            item => item.name === place
        );

    if (!destination) return [];

    /*
       IMPORTANT:
       We deliberately use the destination's own
       image instead of random/default images.
       This prevents Taj Mahal or another place
       appearing inside unrelated cards.
    */

    return [destination.image];
}


/* ==========================================
   12. DESTINATION MODAL
========================================== */

function openDestinationModal(
    title,
    location,
    category,
    rating,
    description
) {

    const modal =
        document.getElementById(
            "destinationModal"
        );

    if (!modal) return;

    const titleElement =
        document.getElementById(
            "modalTitle"
        );

    const locationElement =
        document.getElementById(
            "modalLocation"
        );

    const categoryElement =
        document.getElementById(
            "modalCategory"
        );

    const ratingElement =
        document.getElementById(
            "modalRating"
        );

    const descriptionElement =
        document.getElementById(
            "modalDescription"
        );

    const imageElement =
        document.getElementById(
            "modalImage"
        );

    if (titleElement) {
        titleElement.textContent = title;
    }

    if (locationElement) {
        locationElement.textContent =
            "📍 " + location;
    }

    if (categoryElement) {
        categoryElement.textContent =
            category;
    }

    if (ratingElement) {
        ratingElement.textContent =
            "⭐ " + rating;
    }

    if (descriptionElement) {

        descriptionElement.innerHTML = `
            <div class="description-point">
                <span>01</span>
                <p>${description}</p>
            </div>

            <div class="description-point">
                <span>02</span>
                <p>
                    Explore the architecture,
                    culture and heritage of
                    ${location}.
                </p>
            </div>

            <div class="description-point">
                <span>03</span>
                <p>
                    Discover the mysterious facts
                    and history of this destination.
                </p>
            </div>
        `;
    }

    const gallery =
        getGalleryForDestination(title);

    currentGallery =
        gallery.length
            ? gallery
            : [];

    currentGalleryIndex = 0;

    if (imageElement) {
        createModalGallery(imageElement);
    }

    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";
}


/* ==========================================
   13. MODAL GALLERY
========================================== */

function createModalGallery(container) {

    if (!container) return;

    container.innerHTML = `
        <div class="gallery-main">

            <img
                id="galleryMainImage"
                src="${currentGallery[0] || ""}"
                alt="Destination image"
                loading="lazy"
                decoding="async"
            >

            ${
                currentGallery.length > 1
                    ? `
                        <button
                            type="button"
                            class="gallery-arrow gallery-prev"
                            onclick="previousGalleryImage(event)"
                        >
                            ❮
                        </button>

                        <button
                            type="button"
                            class="gallery-arrow gallery-next"
                            onclick="nextGalleryImage(event)"
                        >
                            ❯
                        </button>
                    `
                    : ""
            }

            <div
                class="gallery-counter"
                id="galleryCounter"
            >
                1 / ${Math.max(currentGallery.length, 1)}
            </div>

        </div>

        ${
            currentGallery.length > 1
                ? `
                    <div
                        class="gallery-thumbnails"
                        id="galleryThumbnails"
                    ></div>
                `
                : ""
        }
    `;

    const image =
        document.getElementById(
            "galleryMainImage"
        );

    if (image) {

        image.onerror = function () {

            this.style.display = "none";

        };
    }

    renderGalleryThumbnails();
}


/* ==========================================
   14. GALLERY THUMBNAILS
========================================== */

function renderGalleryThumbnails() {

    const container =
        document.getElementById(
            "galleryThumbnails"
        );

    if (!container) return;

    container.innerHTML = "";

    currentGallery.forEach(
        (src, index) => {

            const thumb =
                document.createElement("img");

            thumb.src = src;

            thumb.alt =
                "Gallery image " +
                (index + 1);

            thumb.className =
                index === currentGalleryIndex
                    ? "gallery-thumb active"
                    : "gallery-thumb";

            thumb.loading = "lazy";
            thumb.decoding = "async";

            thumb.onerror =
                function () {

                    this.remove();

                };

            thumb.onclick =
                function (event) {

                    event.stopPropagation();

                    currentGalleryIndex =
                        index;

                    updateGallery();

                };

            container.appendChild(thumb);
        }
    );
}


/* ==========================================
   15. UPDATE GALLERY
========================================== */

function updateGallery() {

    if (!currentGallery.length) return;

    const image =
        document.getElementById(
            "galleryMainImage"
        );

    if (!image) return;

    image.src =
        currentGallery[
            currentGalleryIndex
        ];

    const counter =
        document.getElementById(
            "galleryCounter"
        );

    if (counter) {

        counter.textContent =
            `${currentGalleryIndex + 1} / ${currentGallery.length}`;

    }

    renderGalleryThumbnails();
}


function nextGalleryImage(event) {

    if (event) {
        event.stopPropagation();
    }

    if (!currentGallery.length) return;

    currentGalleryIndex =
        (currentGalleryIndex + 1) %
        currentGallery.length;

    updateGallery();
}


function previousGalleryImage(event) {

    if (event) {
        event.stopPropagation();
    }

    if (!currentGallery.length) return;

    currentGalleryIndex--;

    if (currentGalleryIndex < 0) {

        currentGalleryIndex =
            currentGallery.length - 1;
    }

    updateGallery();
}


/* ==========================================
   16. CLOSE DESTINATION MODAL
========================================== */

function closeDestinationModal() {

    const modal =
        document.getElementById(
            "destinationModal"
        );

    if (modal) {
        modal.classList.remove("show");
    }

    document.body.style.overflow = "";
}


/* ==========================================
   17. PLAN ROUTE
========================================== */

function planRoute() {

    closeDestinationModal();

    scrollToRoute();
}


/* ==========================================
   18. FAVORITES
========================================== */

function toggleFavorite(button) {

    if (!button) return;

    const active =
        button.classList.contains("active");

    if (active) {

        button.innerHTML = "♡";

        button.classList.remove(
            "active"
        );

    } else {

        button.innerHTML = "♥";

        button.classList.add(
            "active"
        );
    }
}


/* ==========================================
   19. MYSTERIOUS FACTS DATA
========================================== */

const destinationStories = {

    "Taj Mahal": {
        subtitle:
            "History, architecture, legends and fascinating details behind India's most famous monument.",

        quickFacts: [
            {
                type: "History",
                text:
                    "Commissioned by Mughal emperor Shah Jahan in memory of Mumtaz Mahal."
            },
            {
                type: "Architecture",
                text:
                    "The monument combines Mughal, Persian, Turkish and Indian architectural influences."
            },
            {
                type: "Material",
                text:
                    "The main structure is faced with white Makrana marble and decorated with stone inlay."
            },
            {
                type: "UNESCO",
                text:
                    "The Taj Mahal was declared a UNESCO World Heritage Site in 1983."
            }
        ],

        story: [
            `The Taj Mahal is much more than a famous white marble building. It is a carefully planned Mughal complex consisting of the main mausoleum, a large garden, a mosque, a matching guesthouse and monumental gateways. Emperor Shah Jahan commissioned the monument after the death of his wife Mumtaz Mahal in 1631. Construction began in the early seventeenth century and involved thousands of craftsmen, architects, stone workers and artists. The monument became one of the most important expressions of Mughal architecture.`,

            `One of the most fascinating things about the Taj Mahal is its relationship with light. The marble reflects the changing colour of the sky, so the monument can appear slightly different during sunrise, bright daylight and evening. This is not evidence of magical colour-changing stone; it is a visual effect created by polished marble and changing natural light. The symmetry of the complex is another important feature. The garden, pathways, reflecting pool and buildings were carefully arranged to create a balanced visual composition.`,

            `Many stories are associated with the Taj Mahal. One popular legend says Shah Jahan planned to construct a black version of the Taj Mahal on the opposite side of the Yamuna. Another famous story claims that the craftsmen involved in construction were punished after completing the monument. These stories are widely repeated, but they should be treated as legends rather than established historical facts. Researchers rely on surviving historical records, architecture and archaeological evidence instead.`,

            `The decorative work inside and outside the monument is also remarkable. Artists used a technique called pietra dura, in which carefully shaped pieces of coloured stone were inserted into the marble to create floral and geometric patterns. Calligraphy was also used extensively. The lettering was designed so that the writing appears visually balanced from ground level.`,

            `Today the Taj Mahal represents several layers of history at once. It is a Mughal monument, a mausoleum, an architectural masterpiece and a major symbol of Agra. Its importance comes not only from its appearance but also from the combination of engineering, craftsmanship, garden planning and historical context that produced it.`
        ]
    },


    "Agra Fort": {
        subtitle:
            "The powerful Mughal fort that witnessed the rise and transformation of an empire.",

        quickFacts: [
            {
                type: "Construction",
                text:
                    "Major rebuilding began under Emperor Akbar in the sixteenth century."
            },
            {
                type: "Material",
                text:
                    "Large sections of the fort were constructed using red sandstone."
            },
            {
                type: "Mughal History",
                text:
                    "The complex was expanded by later Mughal rulers including Shah Jahan."
            },
            {
                type: "UNESCO",
                text:
                    "Agra Fort became a UNESCO World Heritage Site in 1983."
            }
        ],

        story: [
            `Agra Fort is one of the most important surviving Mughal forts in India. Although an earlier fort existed at the location, Emperor Akbar transformed it into a major imperial stronghold during the sixteenth century. Its location beside the Yamuna made it strategically important because the river provided both a natural defensive feature and an important transportation route. Over time the fort became much more than a military structure. It developed into a royal complex containing palaces, halls, gardens, mosques and administrative spaces.`,

            `The outer walls are built mainly from red sandstone and create a massive defensive enclosure. Inside, however, the architectural style changes dramatically. Later Mughal rulers introduced white marble structures, delicate decoration and elaborate halls. This mixture allows visitors to see how Mughal architecture changed from the comparatively strong sandstone style associated with Akbar to the refined marble style associated with Shah Jahan.`,

            `One of the most remembered stories connected with Agra Fort concerns Shah Jahan. After a struggle for power, his son Aurangzeb confined him inside the fort. Shah Jahan spent his final years in an area from which the Taj Mahal could be seen across the Yamuna. The story has become one of the most emotional associations of the fort, connecting two famous monuments in the history of the Mughal dynasty.`,

            `The fort also contains important halls used for different kinds of royal activity. The Diwan-i-Aam was associated with public audiences, while the Diwan-i-Khas was intended for more private meetings. These spaces demonstrate that a Mughal fort was not simply a defensive building. It was effectively a complete political and residential centre.`,

            `Today Agra Fort provides an important opportunity to understand Mughal history from a different perspective than the Taj Mahal. While the Taj is mainly associated with beauty and remembrance, Agra Fort reveals military planning, royal life, administration and the changing architectural preferences of several generations of rulers.`
        ]
    },


    "Mehtab Bagh": {
        subtitle:
            "A peaceful Mughal garden across the Yamuna with one of the finest views of the Taj Mahal.",

        quickFacts: [
            {
                type: "Meaning",
                text:
                    "The name Mehtab Bagh is commonly translated as Moonlight Garden."
            },
            {
                type: "Design",
                text:
                    "The garden follows the traditional Mughal charbagh concept."
            },
            {
                type: "Location",
                text:
                    "It lies on the opposite side of the Yamuna from the Taj Mahal."
            },
            {
                type: "View",
                text:
                    "The location provides a distinctive northern view of the Taj Mahal."
            }
        ],

        story: [
            `Mehtab Bagh is one of the most peaceful historical places around Agra. Located on the opposite bank of the Yamuna from the Taj Mahal, the garden was designed as part of the larger Mughal tradition of formal gardens. Mughal gardens often represented an idealised version of paradise, using water channels, geometric pathways, plants and carefully planned views. Mehtab Bagh is particularly interesting because its location makes the Taj Mahal itself part of the garden's visual composition.`,

            `The name is commonly associated with moonlight, which has helped create many romantic descriptions of the garden. Historically, however, it was part of a carefully planned landscape rather than simply a place created for night-time viewing. Its position along the river allowed visitors to look toward the Taj Mahal from a completely different direction.`,

            `The garden suffered from flooding and changing river conditions over the centuries. Archaeological investigations later helped identify the original layout and surviving structural remains. Restoration efforts have allowed visitors to understand the basic geometry of the historic garden while also protecting the area around the Taj Mahal.`,

            `One of the most popular experiences at Mehtab Bagh is watching the Taj Mahal around sunset. As the daylight becomes softer, the marble structure appears against the changing sky and the Yamuna. Photographers particularly value this viewpoint because it provides a broad perspective that is difficult to obtain from the main Taj Mahal complex.`,

            `Mehtab Bagh therefore demonstrates an important principle of Mughal architecture: monuments were often designed together with their surroundings. The Taj Mahal was not conceived as an isolated building. Its gardens, river, gateways and surrounding landscape all contribute to the way the monument is experienced.`
        ]
    },


    "Prem Mandir": {
        subtitle:
            "A modern marble temple in Vrindavan where traditional devotional art meets contemporary construction.",

        quickFacts: [
            {
                type: "Modern Temple",
                text:
                    "The temple was developed by the Jagadguru Kripalu Parishat organisation."
            },
            {
                type: "Architecture",
                text:
                    "The complex is known for extensive white marble carving."
            },
            {
                type: "Artwork",
                text:
                    "The exterior contains detailed scenes connected with Radha-Krishna and Rama traditions."
            },
            {
                type: "Evening View",
                text:
                    "The temple is particularly popular after sunset because of its illumination."
            }
        ],

        story: [
            `Prem Mandir is a relatively modern landmark compared with the centuries-old temples of Vrindavan. Its design was created to present devotional stories through architecture and sculpture. The temple complex uses extensive white marble, giving it a bright appearance during the day and allowing coloured lighting to create a very different atmosphere after sunset.`,

            `One of the most interesting features of Prem Mandir is the amount of visual storytelling incorporated into its design. Sculptures and carved panels depict scenes connected with the lives and traditions of Radha and Krishna as well as Rama. Instead of relying only on written explanations, the architecture itself becomes a medium for presenting stories to visitors.`,

            `The surrounding gardens add another important layer to the experience. Open spaces, pathways and sculptures create a transition between the busy roads outside and the temple complex. During the evening, lighting changes the appearance of the marble and makes many architectural details more visible.`,

            `Because Prem Mandir is modern, it demonstrates how Indian temple architecture continues to evolve. Traditional themes and devotional symbolism are presented using contemporary construction, large-scale planning and modern lighting technology. This combination has made the temple especially popular with younger visitors and tourists who are interested in architecture as well as spirituality.`,

            `A visit to Prem Mandir therefore offers a different experience from visiting an ancient archaeological monument. Instead of looking mainly at ruins or surviving historical structures, visitors see a living devotional environment that has been designed to communicate traditional stories through a modern architectural language.`
        ]
    },


    "Banke Bihari Temple": {
        subtitle:
            "A famous Vrindavan temple surrounded by devotion, music, tradition and fascinating legends.",

        quickFacts: [
            {
                type: "Tradition",
                text:
                    "The temple is associated with the devotional tradition of Swami Haridas."
            },
            {
                type: "Deity",
                text:
                    "The principal deity is a form of Krishna known as Banke Bihari."
            },
            {
                type: "Ritual",
                text:
                    "The temple follows distinctive traditions during darshan."
            },
            {
                type: "Festivals",
                text:
                    "The temple attracts particularly large crowds during major festivals."
            }
        ],

        story: [
            `Banke Bihari Temple is one of the most famous religious destinations in Vrindavan. The temple is associated with Swami Haridas, a saint and musician whose devotional tradition became deeply connected with Krishna worship. The name Banke Bihari is generally understood as referring to Krishna's characteristic graceful and slightly bent posture.`,

            `The temple has a very different atmosphere from large open monuments. Its surrounding streets are narrow and busy, and the experience is strongly connected with devotional activity. Visitors may hear bells, devotional singing and announcements while moving through the surrounding market areas. This combination of temple worship and everyday local life gives the neighbourhood its distinctive character.`,

            `One of the most interesting traditions is the way darshan is conducted. Curtains are periodically drawn across the deity, creating brief moments when devotees can see the image and then moments when the view is covered. Devotees attach deep spiritual meaning to this practice. Stories explaining the tradition are part of local temple culture and should be understood within that religious context.`,

            `The temple becomes especially crowded during festivals such as Holi and Janmashtami. Vrindavan itself has a strong association with Krishna traditions, and many visitors come specifically to experience the devotional atmosphere rather than simply see a historical building.`,

            `Banke Bihari Temple is therefore best understood as a living religious institution rather than only a tourist attraction. Its significance comes from the combination of devotional history, music, ritual, local traditions and the continuing participation of visitors and worshippers.`
        ]
    },


    "India Gate": {
        subtitle:
            "Delhi's famous war memorial and one of the city's most recognisable public landmarks.",

        quickFacts: [
            {
                type: "Architect",
                text:
                    "India Gate was designed by British architect Edwin Lutyens."
            },
            {
                type: "Completion",
                text:
                    "The monument was completed in the early twentieth century."
            },
            {
                type: "Purpose",
                text:
                    "It commemorates Indian soldiers who died in wars including World War I."
            },
            {
                type: "Location",
                text:
                    "The monument stands along the ceremonial central axis of New Delhi."
            }
        ],

        story: [
            `India Gate is one of the most recognisable structures in New Delhi. Although it is now strongly associated with Indian national identity, the monument was originally constructed as a war memorial during the British colonial period. It was designed by Edwin Lutyens, one of the major architects responsible for the planning of New Delhi.`,

            `The structure takes the form of a monumental stone arch. Its design draws from the tradition of commemorative arches but was adapted to the scale and planning of New Delhi. The wide open area around the monument allows it to be seen from a considerable distance and makes the surrounding lawns an important part of the experience.`,

            `The names inscribed on the memorial connect the monument to individual soldiers rather than only to an abstract military event. This makes India Gate an important reminder that large historical events affect real people and families. Over time, the monument developed an additional role as a public gathering place for Delhi residents.`,

            `The area around India Gate is particularly popular during evenings. Families, students and visitors often gather on the surrounding lawns, while the illuminated monument becomes a major visual landmark. This combination of remembrance and everyday public life has made India Gate different from many traditional historical monuments.`,

            `India Gate also exists within a larger network of national memorials in central Delhi. The National War Memorial nearby provides a more recent commemorative space. Together these places show how the meaning of public monuments can develop over time as societies reinterpret their history and remember different generations of service personnel.`
        ]
    },


    "Red Fort": {
        subtitle:
            "The Mughal fortress that became one of the strongest symbols of India's independence.",

        quickFacts: [
            {
                type: "Builder",
                text:
                    "The fort was commissioned by Mughal emperor Shah Jahan."
            },
            {
                type: "Material",
                text:
                    "Its massive outer walls are primarily made from red sandstone."
            },
            {
                type: "Capital",
                text:
                    "It became the main imperial residence after Shah Jahan shifted his capital to Delhi."
            },
            {
                type: "UNESCO",
                text:
                    "The Red Fort was designated a UNESCO World Heritage Site in 2007."
            }
        ],

        story: [
            `The Red Fort, or Lal Qila, was constructed when Shah Jahan shifted the Mughal capital from Agra to Delhi. The fort formed the centre of a new imperial city and was designed to combine defence, administration and royal life. Its massive walls were intended to communicate strength, while the buildings inside demonstrated the wealth and sophistication of the Mughal court.`,

            `Inside the fort were royal apartments, audience halls, gardens, mosques and other structures. The contrast between the enormous sandstone walls and the highly decorated interiors is one of the most interesting aspects of the complex. The fort was not simply a military structure. It functioned as a carefully planned royal environment.`,

            `The Diwan-i-Aam was associated with public audiences, while the Diwan-i-Khas was used for more private royal meetings. Water channels and gardens created cooler and more pleasant spaces inside the complex. This demonstrates the importance of landscape and climate management in Mughal palace design.`,

            `The meaning of the Red Fort changed dramatically during the twentieth century. After independence in 1947, the fort became associated with the new Indian nation. The Prime Minister's Independence Day address from the fort's ramparts became an important annual national tradition.`,

            `Because of this history, the Red Fort connects several periods of Delhi's past. It represents Mughal imperial power, the colonial period and modern India's independence. A visit therefore provides more than architectural sightseeing; it offers a way to see how the meaning of a monument can change as political history changes around it.`
        ]
    },


    "Qutub Minar": {
        subtitle:
            "A towering medieval monument surrounded by layers of Delhi's architectural history.",

        quickFacts: [
            {
                type: "Height",
                text:
                    "The Qutub Minar rises to approximately 73 metres."
            },
            {
                type: "Construction",
                text:
                    "Construction began under Qutb-ud-din Aibak and was continued by later rulers."
            },
            {
                type: "Material",
                text:
                    "The tower uses red sandstone with marble and detailed inscriptions."
            },
            {
                type: "UNESCO",
                text:
                    "The Qutub complex was declared a UNESCO World Heritage Site in 1993."
            }
        ],

        story: [
            `Qutub Minar is one of Delhi's most recognisable medieval monuments. Construction began around the beginning of the Delhi Sultanate and was continued or modified by later rulers. Its height makes it visually dominant, but the surrounding Qutub complex is equally important because it contains structures from different stages of Delhi's medieval history.`,

            `The tower is divided into several levels, with balconies marking the transitions between sections. Decorative bands of inscriptions and geometric patterns run around the structure. The combination of height, tapering form and surface decoration makes the monument both an engineering achievement and a carefully designed piece of architecture.`,

            `Nearby, visitors can see the remains of the Quwwat-ul-Islam mosque and several other structures. The complex therefore provides evidence of how buildings were added, modified and reused over generations. It is more accurate to think of the Qutub complex as a historical landscape than as a single isolated tower.`,

            `Another famous object nearby is the Iron Pillar. The pillar is much older than the Qutub Minar and is valued for its historical and metallurgical significance. Its presence demonstrates how monuments from very different periods can exist together in Delhi.`,

            `The Qutub complex is therefore particularly useful for understanding the layered character of Delhi. Different rulers, architectural traditions and historical periods are represented within a relatively small area, allowing visitors to observe how the city developed over centuries.`
        ]
    },


    "Humayun's Tomb": {
        subtitle:
            "The grand Mughal garden tomb whose design influenced later monuments such as the Taj Mahal.",

        quickFacts: [
            {
                type: "Commission",
                text:
                    "The tomb was commissioned by Empress Bega Begum after Emperor Humayun's death."
            },
            {
                type: "Architecture",
                text:
                    "It combines Persian garden planning with Indian architectural craftsmanship."
            },
            {
                type: "Garden",
                text:
                    "The monument is surrounded by a formal charbagh garden."
            },
            {
                type: "UNESCO",
                text:
                    "Humayun's Tomb was declared a UNESCO World Heritage Site in 1993."
            }
        ],

        story: [
            `Humayun's Tomb is one of the most important early Mughal monuments in India. Commissioned by Empress Bega Begum after the death of Emperor Humayun, the monument introduced a grand combination of Persian garden planning and Indian craftsmanship. Its design became an important influence on later Mughal architecture.`,

            `The most noticeable feature is the relationship between the tomb and its garden. The charbagh layout divides the landscape into geometric sections using pathways and water channels. This arrangement creates a strong sense of symmetry and also reflects the Persian concept of a paradise garden.`,

            `The building itself uses red sandstone together with white and darker marble details. The contrast between the materials makes the structure visually striking. The large central dome dominates the composition while smaller decorative elements balance the four sides of the building.`,

            `The complex also contains several other Mughal-era tombs and structures. This makes the site valuable not only for the main tomb but also for understanding how royal burial landscapes developed around Delhi. The buildings demonstrate changing architectural ideas across different periods.`,

            `Humayun's Tomb is sometimes described as an important predecessor to the Taj Mahal. The comparison is useful because both monuments combine a monumental tomb with a formal garden, although they belong to different periods and have different architectural identities. Visiting Humayun's Tomb therefore helps explain how Mughal architecture developed before reaching the highly refined marble style associated with the Taj Mahal.`
        ]
    }

};


/* ==========================================
   20. FALLBACK STORY GENERATOR
========================================== */

function createFallbackStory(destination) {

    return [
        `${destination.name} is an interesting destination in ${destination.city}, known for its ${destination.category.toLowerCase()}. The place has developed an important connection with the cultural and historical identity of the region. Visitors can experience its architecture, surroundings and local atmosphere while learning how the destination fits into the wider history of India.`,

        `One of the most interesting aspects of ${destination.name} is the way history and present-day tourism meet. A historical destination is not simply a building or location. It can also represent stories, traditions, artistic practices and the people who have preserved its importance over time. This makes visiting the place more meaningful than simply taking photographs.`,

        `Local traditions and stories can sometimes create mysterious or fascinating explanations about important places. However, it is useful to separate legends from verified historical information. Legends are valuable because they show what communities believe and how stories are passed between generations, while historical evidence helps us understand what can be confidently established.`,

        `The surrounding area is also part of the destination's identity. Local markets, food, streets, festivals and everyday life can provide additional context for visitors. Exploring these elements can turn a short visit into a broader cultural experience and help travellers understand the character of ${destination.city}.`,

        `Today, ${destination.name} continues to attract visitors because it combines visual interest with cultural meaning. Whether someone is interested in history, architecture, spirituality, photography or simply discovering new places, the destination offers something worth exploring. SmartTour AI presents these details in an easy format so travellers can understand the story before planning their journey.`
    ];
}


/* ==========================================
   21. HISTORY FACTS ALIAS
========================================== */

const historyFacts =
    destinationStories;


/* ==========================================
   22. FACTS VIEW MODE
========================================== */

let factsViewMode = "grid";


/* ==========================================
   23. OPEN MYSTERIOUS FACTS
========================================== */

function openHistoryFacts(place) {

    const destination =
        destinations.find(
            item => item.name === place
        );

    if (!destination) return;

    const data =
        destinationStories[place] || {

            subtitle:
                `Discover the history, culture and interesting details of ${place}.`,

            quickFacts: [
                {
                    type: "Location",
                    text:
                        `${place} is located in ${destination.city}.`
                },

                {
                    type: "Category",
                    text:
                        `This destination is known for ${destination.category.toLowerCase()}.`
                },

                {
                    type: "Rating",
                    text:
                        `SmartTour AI destination rating: ${destination.rating}.`
                }
            ],

            story:
                createFallbackStory(destination)
        };


    factsViewMode = "grid";


    let modal =
        document.getElementById(
            "factsModal"
        );


    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "factsModal";

        modal.className =
            "facts-modal";

        document.body.appendChild(modal);

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {
                    closeHistoryFacts();
                }

            }
        );
    }


    modal.innerHTML = `

        <div class="facts-box">

            <button
                class="facts-close"
                type="button"
                onclick="closeHistoryFacts()"
            >
                ×
            </button>


            <div class="facts-hero-images">

                <div class="facts-hero-main">

                    <img
                        id="factsHeroMain"
                        src="${destination.image}"
                        alt="${destination.name}"
                        loading="lazy"
                        decoding="async"
                    >

                </div>

            </div>


            <div class="facts-scroll">

                <span class="facts-tag">
                    HISTORY • MYSTERY • DISCOVERY
                </span>


                <h2 class="facts-title">
                    ${destination.name}
                </h2>


                <p class="facts-subtitle">
                    ${data.subtitle}
                </p>


                <div class="facts-location-line">
                    📍 ${destination.city}
                    &nbsp;&nbsp; • &nbsp;&nbsp;
                    ${destination.category}
                    &nbsp;&nbsp; • &nbsp;&nbsp;
                    ⭐ ${destination.rating}
                </div>


                <div class="quickfacts-header">

                    <h4>
                        Quick Facts
                    </h4>


                    <div class="quickfacts-toggle">

                        <button
                            type="button"
                            class="view-btn active"
                            data-view="grid"
                            onclick="setFactsView('grid')"
                        >
                            ▦ Cards
                        </button>


                        <button
                            type="button"
                            class="view-btn"
                            data-view="list"
                            onclick="setFactsView('list')"
                        >
                            ☰ List
                        </button>

                    </div>

                </div>


                <div
                    id="quickFactsContainer"
                    class="quickfacts-grid"
                >
                    ${renderQuickFacts(
                        data.quickFacts,
                        "grid"
                    )}
                </div>


                <div class="facts-story">

                    <h4>
                        The Story
                    </h4>

                    ${data.story
                        .map(
                            paragraph =>
                                `<p>${paragraph}</p>`
                        )
                        .join("")
                    }

                </div>


                <div class="fact-note">

                    💡
                    <strong>SmartTour Note:</strong>
                    Legends and verified historical
                    information are kept separate
                    wherever possible.

                </div>

            </div>

        </div>
    `;


    const heroImage =
        document.getElementById(
            "factsHeroMain"
        );

    if (heroImage) {

        heroImage.onerror =
            function () {

                this.style.display =
                    "none";

            };
    }


    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";
}


/* ==========================================
   24. QUICK FACTS RENDER
========================================== */

function renderQuickFacts(
    facts,
    mode
) {

    if (mode === "list") {

        return `
            <div class="quickfacts-list">

                ${facts.map(fact => `

                    <div class="quickfact-list-item">

                        <strong>
                            ${fact.type}
                        </strong>

                        <span>
                            ${fact.text}
                        </span>

                    </div>

                `).join("")}

            </div>
        `;
    }


    return facts.map(
        (fact, index) => `

            <div class="fact-item">

                <div class="fact-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div>

                    <strong>
                        ${fact.type}
                    </strong>

                    <p>
                        ${fact.text}
                    </p>

                </div>

            </div>
        `
    ).join("");
}


/* ==========================================
   25. SET FACTS VIEW
========================================== */

function setFactsView(mode) {

    factsViewMode = mode;

    const container =
        document.getElementById(
            "quickFactsContainer"
        );

    if (!container) return;


    const title =
        document.querySelector(
            ".facts-title"
        );

    if (!title) return;


    const place =
        title.textContent.trim();


    const destination =
        destinations.find(
            item => item.name === place
        );


    if (!destination) return;


    const data =
        destinationStories[place] || {

            quickFacts: [
                {
                    type: "Location",
                    text:
                        `${place} is located in ${destination.city}.`
                },

                {
                    type: "Category",
                    text:
                        destination.category
                }
            ]
        };


    container.className =
        mode === "list"
            ? "quickfacts-list-wrap"
            : "quickfacts-grid";


    container.innerHTML =
        renderQuickFacts(
            data.quickFacts,
            mode
        );


    document
        .querySelectorAll(".view-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.view === mode
            );

        });
}


/* ==========================================
   26. CLOSE HISTORY FACTS
========================================== */

function closeHistoryFacts() {

    const modal =
        document.getElementById(
            "factsModal"
        );

    if (modal) {
        modal.classList.remove("show");
    }

    document.body.style.overflow =
        "";
}


/* ==========================================
   27. DESTINATION CARD + LIST GENERATOR
========================================== */

let destinationViewMode = "grid";


function generateDestinationCards() {

    const grid =
        document.querySelector(
            ".destination-grid"
        );

    if (
        !grid ||
        typeof destinations === "undefined"
    ) {
        return;
    }


    grid.innerHTML = "";


    destinations.forEach(
        destination => {

            const card =
                document.createElement("article");

            card.className =
                "destination-card";


            card.dataset.name =
                destination.name;

            card.dataset.city =
                destination.city;

            card.dataset.category =
                destination.category;


            card.addEventListener(
                "click",
                function () {

                    openDestinationModal(
                        destination.name,
                        destination.city,
                        destination.category,
                        destination.rating,
                        destination.description
                    );

                }
            );


            card.innerHTML = `

                <button
                    type="button"
                    class="favorite-btn"
                    aria-label="Add to favorites"
                    onclick="
                        event.stopPropagation();
                        toggleFavorite(this);
                    "
                >
                    ♡
                </button>


                <button
                    type="button"
                    class="fact-btn"
                    onclick="
                        event.stopPropagation();
                        openHistoryFacts('${destination.name.replace(/'/g, "\\'")}');
                    "
                >
                    🔍 Mysterious Facts
                </button>


                <div class="destination-image">

                    <img
                        src="${destination.image}"
                        alt="${destination.name}"
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                    >


                    <span class="location-tag">
                        📍 ${destination.city}
                    </span>

                </div>


                <div class="destination-info">

                    <div>

                        <h3>
                            ${destination.name}
                        </h3>

                        <p>
                            ${destination.category}
                        </p>

                    </div>


                    <div class="rating">
                        ⭐ ${destination.rating}
                    </div>

                </div>

            `;


            const image =
                card.querySelector(
                    ".destination-image img"
                );


            if (image) {

                image.addEventListener(
                    "error",
                    function () {

                        this.style.display =
                            "none";

                    }
                );
            }


            grid.appendChild(card);

        }
    );


    createDestinationList();

    applyDestinationView();
}


/* ==========================================
   28. DESTINATION LIST
========================================== */

function createDestinationList() {

    const grid =
        document.querySelector(
            ".destination-grid"
        );

    if (!grid) return;


    let list =
        document.querySelector(
            ".destination-list"
        );


    if (!list) {

        list =
            document.createElement("div");

        list.className =
            "destination-list";

        grid.after(list);

    }


    list.innerHTML = "";


    destinations.forEach(
        destination => {

            const item =
                document.createElement("article");

            item.className =
                "destination-list-item";


            item.dataset.name =
                destination.name;


            item.addEventListener(
                "click",
                function () {

                    openDestinationModal(
                        destination.name,
                        destination.city,
                        destination.category,
                        destination.rating,
                        destination.description
                    );

                }
            );


            item.innerHTML = `

                <div class="list-image">

                    <img
                        src="${destination.image}"
                        alt="${destination.name}"
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                    >

                </div>


                <div class="list-content">

                    <div class="list-top">

                        <span class="list-location">
                            📍 ${destination.city}
                        </span>

                        <span class="rating">
                            ⭐ ${destination.rating}
                        </span>

                    </div>


                    <h3>
                        ${destination.name}
                    </h3>


                    <p class="list-category">
                        ${destination.category}
                    </p>


                    <p class="list-description">
                        ${destination.description}
                    </p>


                    <div class="list-actions">

                        <button
                            type="button"
                            class="list-favorite"
                            onclick="
                                event.stopPropagation();
                                toggleFavorite(this);
                            "
                        >
                            ♡
                        </button>


                        <button
                            type="button"
                            class="list-facts"
                            onclick="
                                event.stopPropagation();
                                openHistoryFacts('${destination.name.replace(/'/g, "\\'")}');
                            "
                        >
                            🔍 Mysterious Facts
                        </button>

                    </div>

                </div>

            `;


            const image =
                item.querySelector(
                    ".list-image img"
                );


            if (image) {

                image.addEventListener(
                    "error",
                    function () {

                        this.style.display =
                            "none";

                    }
                );
            }


            list.appendChild(item);

        }
    );
}


/* ==========================================
   29. CARD / LIST TOGGLE
========================================== */

function initializeDestinationView() {

    const section =
        document.getElementById("places");

    if (!section) return;


    const heading =
        section.querySelector(
            ".section-heading"
        );


    if (!heading) return;


    const existing =
        heading.querySelector(
            ".destination-view-toggle"
        );


    if (existing) return;


    const toggle =
        document.createElement("div");

    toggle.className =
        "destination-view-toggle";


    toggle.innerHTML = `

        <button
            type="button"
            class="destination-view-btn active"
            data-view="grid"
        >
            ▦ Cards
        </button>


        <button
            type="button"
            class="destination-view-btn"
            data-view="list"
        >
            ☰ List
        </button>

    `;


    heading.appendChild(toggle);


    toggle
        .querySelectorAll(
            ".destination-view-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    destinationViewMode =
                        this.dataset.view;

                    toggle
                        .querySelectorAll(
                            ".destination-view-btn"
                        )
                        .forEach(btn => {

                            btn.classList.toggle(
                                "active",
                                btn === this
                            );

                        });

                    applyDestinationView();

                    searchPlaces();

                }
            );
        });
}


/* ==========================================
   30. APPLY CARD / LIST
========================================== */

function applyDestinationView() {

    const grid =
        document.querySelector(
            ".destination-grid"
        );

    const list =
        document.querySelector(
            ".destination-list"
        );


    if (!grid || !list) return;


    if (destinationViewMode === "list") {

        grid.style.display = "none";
        list.style.display = "grid";

    } else {

        grid.style.display = "grid";
        list.style.display = "none";

    }
}


/* ==========================================
   31. HERO SEARCH
========================================== */

function heroSearchDestination() {

    const input =
        document.getElementById(
            "heroSearch"
        );

    if (!input) return;


    const value =
        input.value
            .trim()
            .toLowerCase();


    const mainSearch =
        document.getElementById(
            "placeSearch"
        );


    scrollToPlaces();


    if (!mainSearch) return;


    mainSearch.value =
        value;


    setTimeout(
        searchPlaces,
        500
    );
}


/* ==========================================
   32. HERO CHIPS
========================================== */

function initializeHeroChips() {

    document
        .querySelectorAll(
            ".hero-chips button"
        )
        .forEach(chip => {

            chip.addEventListener(
                "click",
                function () {

                    const text =
                        this.textContent
                            .toLowerCase();

                    const search =
                        document.getElementById(
                            "placeSearch"
                        );

                    if (!search) return;


                    if (
                        text.includes(
                            "historical"
                        )
                    ) {
                        search.value =
                            "historical";
                    }

                    else if (
                        text.includes(
                            "nature"
                        )
                    ) {
                        search.value =
                            "nature";
                    }

                    else if (
                        text.includes(
                            "spiritual"
                        )
                    ) {
                        search.value =
                            "spiritual";
                    }

                    else if (
                        text.includes(
                            "food"
                        )
                    ) {
                        search.value =
                            "food";
                    }

                    else if (
                        text.includes(
                            "shopping"
                        )
                    ) {
                        search.value =
                            "shopping";
                    }

                    else {
                        search.value = "";
                    }


                    scrollToPlaces();


                    setTimeout(
                        searchPlaces,
                        500
                    );

                }
            );
        });
}


/* ==========================================
   33. ENTER SEARCH
========================================== */

function initializeSearchEnter() {

    const heroSearch =
        document.getElementById(
            "heroSearch"
        );

    const placeSearch =
        document.getElementById(
            "placeSearch"
        );


    if (heroSearch) {

        heroSearch.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {
                    heroSearchDestination();
                }

            }
        );
    }


    if (placeSearch) {

        placeSearch.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {
                    searchPlaces();
                }

            }
        );
    }
}


/* ==========================================
   34. DESTINATION MODAL
========================================== */

function initializeDestinationModal() {

    const modal =
        document.getElementById(
            "destinationModal"
        );

    if (!modal) return;


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {
                closeDestinationModal();
            }

        }
    );
}


/* ==========================================
   35. KEYBOARD
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeDestinationModal();
            closeHistoryFacts();

        }


        const modal =
            document.getElementById(
                "destinationModal"
            );


        if (
            modal &&
            modal.classList.contains("show")
        ) {

            if (
                event.key === "ArrowRight"
            ) {
                nextGalleryImage();
            }


            if (
                event.key === "ArrowLeft"
            ) {
                previousGalleryImage();
            }

        }

    }
);


/* ==========================================
   36. INITIALIZE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        generateDestinationCards();

        initializeDestinationView();

        initializeInterestCards();

        initializeViewAll();

        initializeNavbar();

        initializeHeroChips();

        initializeSearchEnter();

        initializeDestinationModal();


        console.log(
            "🚀 SmartTour AI initialized successfully!"
        );

        console.log(
            "🧠 Route Engine: Dijkstra Algorithm"
        );

        console.log(
            "✨ Recommendation Engine: Ready"
        );

        console.log(
            "🔍 Search Engine: Ready"
        );

        console.log(
            "❤️ Favorites: Ready"
        );

        console.log(
            "📋 Card + List View: Ready"
        );

        console.log(
            "🔍 Mysterious Facts: Ready"
        );

    }
);