import { ObjectId } from "mongodb";

export const locations = [
  "ABS Engineering Center",
  "Babbio Center",
  "Burchard Building",
  "Carnegie Laboratory",
  "Davidson Laboratory ",
  "Edwin A. Stevens Hall & DeBaun Auditorium",
  "Gateway North",
  "Gateway South",
  "Kenneth J. Altorfer Academic Complex",
  "Kidde Hall",
  "McLean Hall",
  "Morton Hall",
  "Nicoll Environmental Laboratory",
  "North Building",
  "Peirce Hall",
  "Rocco Technology Center",
  "Samuel C. Williams Library",
  "1 Ninth Street",
  "2 Ninth Street",
  "807 Castle Point Terrace",
  "Gatehouse",
  "Griffith Building",
  "Hoxie House",
  "Ruesterholz Admissions Center",
  "Student Wellness Center",
  "Wesley J. Howe Center",
  "University Center Complex",
  "River Terrace",
  "Castle Point Hall",
  "Davis Hall",
  "Humphreys Hall",
  "Jonas Hall",
  "Lore-El Center",
  "Palmer Hall",
  "South Tower",
];

export const googleLocations = [
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.816633577193!2d-74.03011942339941!3d40.74406017138895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259dfa9b22327%3A0x47fa0d8712e3245e!2sABS%20Engineering%20Center%2C%20Stevens%20Institute%20of%20Technology!5e0!3m2!1sen!2sus!4v1683506374338!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8797260475294!2d-74.02941742339954!3d40.74267197138907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259dfcaa5e61b%3A0x773d39a6a9cb3b70!2sBabbio%20Center!5e0!3m2!1sen!2sus!4v1683506418945!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.870050044784!2d-74.02991772339954!3d40.7428848713891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259dfca1d24cd%3A0x388a594d88ab0ca0!2sBurchard%20Bldg%2C%20Hoboken%2C%20NJ%2007030!5e0!3m2!1sen!2sus!4v1683506285714!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.872084473631!2d-74.03249091529449!3d40.74284010815626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259dfc7c3d893%3A0x51bce1edcb21129!2sCarnegie%20Laboratory!5e0!3m2!1sen!2sus!4v1683506453023!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.7736149664!2d-74.02984892339943!3d40.74500667138859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259df1c2a75fb%3A0xb34aed86d9e48074!2sDavidson%20Laboratory!5e0!3m2!1sen!2sus!4v1683506518845!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8906972843192!2d-74.03031572339957!3d40.74243057138909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259dfcf96f245%3A0x8ededce1cd41689e!2sEdwin%20A.%20Stevens%20Hall%2C%20Hoboken%2C%20NJ%2007030!5e0!3m2!1sen!2sus!4v1683506559155!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.847160302596!2d-74.0322151152945!3d40.743388508155974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25986cd0951cf%3A0x40b4559d540c1e0b!2sThe%20Gateway%20Academic%20Center!5e0!3m2!1sen!2sus!4v1683506589626!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.847160302596!2d-74.0322151152945!3d40.743388508155974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25986cd0951cf%3A0x40b4559d540c1e0b!2sThe%20Gateway%20Academic%20Center!5e0!3m2!1sen!2sus!4v1683506589626!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.837304033057!2d-74.02957812339953!3d40.74360537138896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259de52d9f4bf%3A0x7a7fe4b684d95c08!2sKenneth%20J.%20Altorfer%20Academic%20Complex!5e0!3m2!1sen!2sus!4v1683506631013!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8349406660427!2d-74.02899362339947!3d40.74365737138891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259de574b1b45%3A0x2198a663ee649b33!2sKidde%20Building!5e0!3m2!1sen!2sus!4v1683506653672!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.89456492791!2d-74.02959492339954!3d40.742345471389086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259b33897fea9%3A0x4eab2f2499f3cc0d!2sMcLean%20Hall!5e0!3m2!1sen!2sus!4v1683506677328!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8574289113176!2d-74.02917832339953!3d40.74316257138893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259de4e8c2b63%3A0xc929ea37c391d5a1!2sMorton%20Building!5e0!3m2!1sen!2sus!4v1683506754325!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.80532564828!2d-74.02987202339948!3d40.744308971388726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259dfaa20b667%3A0xcf3bdfd935abf60b!2sNicoll%20Environmental%20Laboratory!5e0!3m2!1sen!2sus!4v1683506770795!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.7223642482963!2d-74.0278945233994!3d40.74613427138843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259d94c673f3d%3A0xecde9647a9793146!2sNorth%20Building!5e0!3m2!1sen!2sus!4v1683506789752!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3095391.5552487057!2d-78.64089801250002!3d40.7434731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259de51914949%3A0xc56f4f3f41575058!2sMorton-Peirce-Kidde%20Complex!5e0!3m2!1sen!2sus!4v1683506813460!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.829963952359!2d-74.02963832339951!3d40.74376687138885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259de54acf5df%3A0x8be882b3d8162255!2sRocco%20Technology%20Center!5e0!3m2!1sen!2sus!4v1683506864457!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.7826096284466!2d-74.02790512339946!3d40.74480877138882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259dec48b0c89%3A0x4453acf8ad0e33fe!2sSamuel%20C%20Williams%20Library!5e0!3m2!1sen!2sus!4v1683506879913!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.7826096284466!2d-74.02790512339946!3d40.74480877138882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259d94ef5c41b%3A0xfa86b431695edb79!2sPollara%20House%2C%201%209th%20St%2C%20Hoboken%2C%20NJ%2007030!5e0!3m2!1sen!2sus!4v1683506899435!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.684798128262!2d-74.02769852339927!3d40.7469607713884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259d945bf2615%3A0xd043fa3094f3d9c8!2s2%209th%20St%2C%20Hoboken%2C%20NJ%2007030!5e0!3m2!1sen!2sus!4v1683506915653!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.684798128262!2d-74.02769852339927!3d40.7469607713884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259deca86e6b3%3A0xf3ddc08ba2deaf8d!2s807%20Castle%20Point%20Terrace%2C%20Hoboken%2C%20NJ%2007030!5e0!3m2!1sen!2sus!4v1683506929646!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.719128087031!2d-74.02822642339939!3d40.74620547138847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259de46a21061%3A0x2e1e39eef3b1d7ac!2sGatehouse%2C%20Hoboken%2C%20NJ%2007030!5e0!3m2!1sen!2sus!4v1683506940272!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.880757727846!2d-74.02772742339964!3d40.74264927138895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259de6c9318a5%3A0xafcf7ebefdee1cee!2sGriffith%20Building!5e0!3m2!1sen!2sus!4v1683506955118!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.880757727846!2d-74.02772742339964!3d40.74264927138895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259dbf94928ff%3A0x894544839cbcb172!2sHoxie%20House%2C%20Hoboken%2C%20NJ%2007030!5e0!3m2!1sen!2sus!4v1683506972794!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.74532631465!2d-74.0262566233994!3d40.74562907138852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259dc20499671%3A0xab0c3ae28e214bd!2sRuesterholz%20Admissions%20Center!5e0!3m2!1sen!2sus!4v1683507047051!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.710137715655!2d-74.02769312339942!3d40.746403271388495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259de84e6ad71%3A0xf2a2ac75a4bbbdec!2sStevens%20Student%20Wellness%20Center!5e0!3m2!1sen!2sus!4v1683507079885!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.7715560518227!2d-74.02671622339935!3d40.74505197138858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259dc1f9fa977%3A0x40a74e41ab041e54!2sWesley%20J.%20Howe%20Center!5e0!3m2!1sen!2sus!4v1683507094814!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1511.3881239268399!2d-74.02699861101345!3d40.74494874284713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2596d0b2e57ed%3A0xcef48f2c924aca17!2sUCC%20Residential%20Towers!5e0!3m2!1sen!2sus!4v1683507124168!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1511.3881239268399!2d-74.02699861101345!3d40.74494874284713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259de4d7ae967%3A0x8986af4a3da4e4e!2sRiver%20Terrace%2C%20Hoboken%2C%20NJ%2007030!5e0!3m2!1sen!2sus!4v1683507136171!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.719128087031!2d-74.0282264233994!3d40.74620547138847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259deca86e6b3%3A0xf3ddc08ba2deaf8d!2s807%20Castle%20Point%20Terrace%2C%20Hoboken%2C%20NJ%2007030!5e0!3m2!1sen!2sus!4v1683507154395!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.719128087031!2d-74.0282264233994!3d40.74620547138847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259de5d659cb3%3A0x9b6ffc134d68cb87!2sDavis%20Hall!5e0!3m2!1sen!2sus!4v1683507167388!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.849475333764!2d-74.02822352339955!3d40.74333757138891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259deae28f6a1%3A0xc2dd2d34aba48448!2sHumphreys%20Hall%2C%20805%20Castle%20Point%20Terrace%2C%20Hoboken%2C%20NJ%2007030!5e0!3m2!1sen!2sus!4v1683507183096!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.733927123431!2d-74.02740422339937!3d40.745879871388574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259deb853f113%3A0xdb5d319a077ff548!2sJonas%20Hall!5e0!3m2!1sen!2sus!4v1683507194710!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.7308318785!2d-74.02900592339947!3d40.74594797138851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259ded036017b%3A0xa905d6c596a4f821!2sLore-El%20Center!5e0!3m2!1sen!2sus!4v1683507213538!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.760647863593!2d-74.02764912339947!3d40.74529197138861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259debc7c1b01%3A0xdd4b73f67778cf8!2sPalmer%20Hall!5e0!3m2!1sen!2sus!4v1683507230166!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.829468552859!2d-74.02825092339955!3d40.74377777138884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259f324967e85%3A0x1c55ab13a115d8e8!2sSouth%20Tower!5e0!3m2!1sen!2sus!4v1683507253554!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="google-map"></iframe>',
];

export const tags = [
  "Electronics",
  "Appliances",
  "Furniture",
  "Clothing",
  "Sports Equipment",
  "Books",
  "School Supplies",
  "Other",
];

const exportedMethods = {
  checkId(id, varName) {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== "string") throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    // //if (!isNaN(strVal))
    //     throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },
  checkSearchText(searchText, varName) {
    // if (!searchText) throw `Error: You must supply a ${varName}!`;
    if (typeof searchText !== "string")
      throw `Error: ${varName} must be a string!`;
    searchText = searchText.trim();
    // if (strVal.length === 0)
    // throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    // //if (!isNaN(strVal))
    //     throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return searchText;
  },

  checkStringArray(arr, varName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    for (let i in arr) {
      if (typeof arr[i] !== "string" || arr[i].trim().length === 0) {
        throw `One or more elements in ${varName} array is not a string or is an empty string`;
      }
      arr[i] = arr[i].trim();
    }

    return arr;
  },

  checkFirstAndLastName(strVal, varName) {
    strVal = this.checkString(strVal, varName);
    if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
    if (/[0-9]/.test(strVal)) throw `${varName} cannot contain numbers`;
    if (strVal.length < 2)
      throw `${varName} should be at least 2 characters long`;
    else if (strVal.length > 25)
      throw `${varName} can only be at max 25 characters long`;

    return strVal;
  },

  checkUsername(strVal, varName) {
    strVal = this.checkString(strVal, varName).toLowerCase();
    if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
    if (strVal.length < 2)
      throw `${varName} should be at least 2 characters long`;
    else if (strVal.length > 25)
      throw `${varName} can only be at max 25 characters long`;

    return strVal;
  },

  checkEmail(strVal, varName) {
    strVal = this.checkString(strVal, varName).toLowerCase();
    if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        strVal
      )
    ) {
      throw `${strVal} is an invalid email`;
    }
    return strVal;
  },

  checkPassword(strVal, varName) {
    strVal = this.checkString(strVal, varName);
    if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
    if (strVal.length < 8)
      throw `${varName} should be at least 8 characters long`;
    if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(strVal))
      throw `${varName} should contain at least one special character`;
    if (!/[A-Z]/.test(strVal))
      throw `${varName} should contain at least one uppercase character`;
    if (!/[0-9]/.test(strVal))
      throw `${varName} should contain at least one number`;

    return strVal;
  },

  checkLocation(strVal, varName) {
    let tempString = strVal;
    strVal = this.checkString(strVal, varName).toLowerCase();
    let lowerCaseLocations = locations.map((i) => {
      return i.toLowerCase();
    });
    if (!lowerCaseLocations.includes(strVal)) throw "Error: invalid location";
    return tempString;
  },
  // checkRating(strVal, varName) {
  //   strVal = this.checkString(strVal, varName).toLowerCase();
  //   if (!int(strVal)) throw "Error: invalid rating";
  //   return strVal;
  // },

  checkItemName(strVal, varName) {
    strVal = this.checkString(strVal, varName);
    //if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
    if (strVal.length < 2)
      throw `${varName} should be at least 2 characters long`;
    else if (strVal.length > 60)
      throw `${varName} can only be at max 60 characters long`;

    return strVal;
  },

  checkDescription(strVal, varName) {
    strVal = this.checkString(strVal, varName);
    //if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
    if (strVal.length > 200)
      throw `${varName} can only be at max 200 characters long`;

    return strVal;
  },

  checkTags(arr, varName) {
    if (typeof arr === "string") {
      arr = [arr];
    }
    arr = this.checkStringArray(arr, varName);
    // arr = arr.map((i) => {
    //   return i.toLowerCase();
    // });
    // let lowerCaseTags = tags.map((i) => {
    //   return i.toLowerCase();
    // });
    // for (let i = 0; i < arr.length; i++) {
    //   if (!lowerCaseTags.includes(arr[i])) {
    //     throw `Error: Invalid Tags ${arr[i]}`;
    //   }
    // }
    return arr;
  },

  checkImgUrlArray(urlArr, varName) {
    urlArr = this.checkStringArray(urlArr, varName);
    if (urlArr.length > 4) throw "Error: maximum of 4 images per post";
    let urlRegex = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator)
    for (let i = 0; i < urlArr.length; i++)
      if (!urlRegex.test(urlArr[i])) throw `Error: Invalid Url ${urlArr[i]}`;

    return urlArr;
  },

  checkCommentInput(comment, varName) {
    comment = this.checkString(comment, varName);
    if (comment.length === 0)
      throw `${varName} should be at least 2 characters long`;
    else if (comment.length > 60)
      throw `${varName} can only be at max 60 characters long`;

    return comment;
  },
  checkRating(rating, varName) {
    if ((rating && typeof rating === "string") || typeof rating === "number") {
      return rating;
    } else {
      throw `${varName} invalid`;
    }
  },
};

export default exportedMethods;
