/* ==========================================
   SMARTTOUR AI - DESTINATIONS
   ========================================== */

const destinations = [

    {
        name: "Taj Mahal",
        city: "Agra",
        category: "Historical • Heritage",
        rating: "4.9",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Taj_Mahal%2C_Agra_India.jpg",
        description: "One of India's most iconic monuments, known for its white marble architecture, gardens and rich Mughal history."
    },

    {
        name: "Agra Fort",
        city: "Agra",
        category: "Historical • Architecture",
        rating: "4.8",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/AGRA_FORT%2C_AGRA.jpg",
        description: "A magnificent Mughal fort built mainly from red sandstone and filled with palaces, courtyards and historic stories."
    },

    {
        name: "Mehtab Bagh",
        city: "Agra",
        category: "Nature • Heritage",
        rating: "4.6",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mehtab_Bagh.jpg",
        description: "A peaceful Mughal garden on the opposite bank of the Yamuna, offering one of the finest views of the Taj Mahal."
    },

    {
        name: "Shri Krishna Janmabhoomi",
        city: "Mathura",
        category: "Spiritual • Heritage",
        rating: "4.7",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Shri_Krishna_Janmabhoomi_birth_site_1949.jpg",
        description: "A major spiritual destination in Mathura traditionally associated with the birthplace of Lord Krishna."
    },

    {
        name: "Prem Mandir",
        city: "Vrindavan",
        category: "Spiritual • Architecture",
        rating: "4.8",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Prem_Mandir%2C_Vrindavan.jpg",
        description: "A beautifully detailed marble temple known for Radha-Krishna carvings, gardens and spectacular evening illumination."
    },

    {
        name: "Banke Bihari Temple",
        city: "Vrindavan",
        category: "Spiritual • Culture",
        rating: "4.7",
        image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Banke_Bihari_Temple%2C_Vrindavan%2C_Mathura%2C_Uttar_Pradesh%2C_India_%282010%29.jpg",
        description: "One of Vrindavan's most famous temples, known for its devotional atmosphere and distinctive traditions."
    },

    {
        name: "ISKCON Temple",
        city: "Vrindavan",
        category: "Spiritual • Culture",
        rating: "4.7",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Iskcon_Vrindavan.jpg",
        description: "A popular Krishna temple combining traditional devotional practices with a global spiritual community."
    },

    {
        name: "Bara Imambara",
        city: "Lucknow",
        category: "Historical • Architecture",
        rating: "4.8",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/TheBaraImambara.jpg",
        description: "A grand Lucknow landmark famous for its enormous vaulted hall and the mysterious Bhool Bhulaiya."
    },

    {
        name: "Chota Imambara",
        city: "Lucknow",
        category: "Historical • Heritage",
        rating: "4.7",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Chota_Imambara.JPG",
        description: "An ornate historic complex famous for chandeliers, decorative interiors and elegant architecture."
    },

    {
        name: "Rumi Darwaza",
        city: "Lucknow",
        category: "Heritage • Architecture",
        rating: "4.7",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Rumi_Darwaza_in_Lucknow.jpg",
        description: "An iconic gateway of Lucknow showcasing impressive Indo-Islamic architectural design."
    },

    {
        name: "Kashi Vishwanath Temple",
        city: "Varanasi",
        category: "Spiritual • Heritage",
        rating: "4.8",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kashi_Vishwanath_Temple_in_Varanasi.jpg",
        description: "A major Shiva temple in Varanasi and one of the most important spiritual landmarks in the city."
    },

    {
        name: "Dashashwamedh Ghat",
        city: "Varanasi",
        category: "Culture • Spiritual",
        rating: "4.8",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Dashashwamedh_Ghat.jpg",
        description: "A famous Ganga-side ghat known for its lively atmosphere and evening Ganga Aarti."
    },

    {
        name: "Assi Ghat",
        city: "Varanasi",
        category: "Culture • Riverside",
        rating: "4.7",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Assi_ghat01.jpg",
        description: "A popular riverside destination known especially for peaceful mornings, sunrise views and cultural experiences."
    },

    {
        name: "Ram Mandir",
        city: "Ayodhya",
        category: "Spiritual • Heritage",
        rating: "4.9",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ram_Mandir_Ayodhya.png",
        description: "A major temple complex in Ayodhya associated with Lord Rama and an important modern pilgrimage destination."
    },

    {
        name: "Hanuman Garhi",
        city: "Ayodhya",
        category: "Spiritual • Culture",
        rating: "4.7",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Hanuman_Garhi_Temple%2C_a_major_religious_site_in_Ayodhya_utter_pradesh.jpg",
        description: "A hilltop temple dedicated to Hanuman and one of the most visited spiritual places in Ayodhya."
    },

    {
        name: "Saryu Ghat",
        city: "Ayodhya",
        category: "Spiritual • Riverside",
        rating: "4.7",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Saryu_River_Bank%2C_Ayodhya%2C_Faizabad%2C_%28U.P.%29%2C_India..JPG",
        description: "A peaceful riverside destination along the sacred Saryu, popular for evening ceremonies and river views."
    },

    {
        name: "Triveni Sangam",
        city: "Prayagraj",
        category: "Spiritual • Nature",
        rating: "4.8",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Triveni_Sangam_Prayagraj.jpg",
        description: "The famous confluence of the Ganga, Yamuna and traditionally believed Saraswati rivers."
    },

    {
        name: "Anand Bhavan",
        city: "Prayagraj",
        category: "History • Heritage",
        rating: "4.6",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Anand_Bhavan_-_The_Ancestral_House_Of_The_Nehru_Family_-_Prayagraj_20230722_152157.jpg",
        description: "A historic heritage museum connected with the Nehru family and India's independence movement."
    },

    {
        name: "India Gate",
        city: "Delhi",
        category: "Historical • Monument",
        rating: "4.8",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/India_gate_new_delhi.jpg",
        description: "One of Delhi's most recognizable landmarks and an important war memorial."
    },

    {
        name: "Red Fort",
        city: "Delhi",
        category: "Historical • Culture",
        rating: "4.7",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Red_Fort_in_Delhi_03-2016_img3.jpg",
        description: "A magnificent Mughal-era fort and one of Delhi's most important historical landmarks."
    },

    {
        name: "Qutub Minar",
        city: "Delhi",
        category: "Heritage • Architecture",
        rating: "4.8",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/QutubMInar.jpg",
        description: "An iconic medieval minaret and one of Delhi's most famous UNESCO World Heritage attractions."
    },

    {
        name: "Humayun's Tomb",
        city: "Delhi",
        category: "Historical • Architecture",
        rating: "4.8",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Humayun%27s_tomb_image.jpg",
        description: "A magnificent Mughal garden tomb known for its symmetrical architecture and beautiful charbagh gardens."
    }

];