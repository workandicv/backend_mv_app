"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Starting database seed...');
    const password = await bcrypt.hash('senha123', 10);
    const passenger1 = await prisma.user.upsert({
        where: { email: 'joao@example.com' },
        update: {},
        create: {
            email: 'joao@example.com',
            password,
            name: 'João Silva',
            phone: '+238 999 1234',
            userType: 'PASSENGER',
            photoUrl: 'https://i.pravatar.cc/150?img=12',
        },
    });
    const passenger2 = await prisma.user.upsert({
        where: { email: 'maria@example.com' },
        update: {},
        create: {
            email: 'maria@example.com',
            password,
            name: 'Maria Santos',
            phone: '+238 999 5678',
            userType: 'PASSENGER',
            photoUrl: 'https://i.pravatar.cc/150?img=45',
        },
    });
    console.log('Passengers created');
    const driver1 = await prisma.user.upsert({
        where: { email: 'manuel@example.com' },
        update: {},
        create: {
            email: 'manuel@example.com',
            password,
            name: 'Manuel Tavares',
            phone: '+238 998 1111',
            userType: 'DRIVER',
            photoUrl: 'https://i.pravatar.cc/150?img=33',
            driverProfile: {
                create: {
                    vehicleModel: 'Toyota Corolla',
                    vehiclePlate: 'CV-1234-AB',
                    vehicleColor: 'Branco',
                    licenseNumber: 'CV123456789',
                    rating: 4.8,
                    totalRides: 245,
                    isAvailable: true,
                    currentLatitude: 16.1773,
                    currentLongitude: -22.9099,
                },
            },
        },
    });
    const driver2 = await prisma.user.upsert({
        where: { email: 'carlos@example.com' },
        update: {},
        create: {
            email: 'carlos@example.com',
            password,
            name: 'Carlos Lopes',
            phone: '+238 998 2222',
            userType: 'DRIVER',
            photoUrl: 'https://i.pravatar.cc/150?img=51',
            driverProfile: {
                create: {
                    vehicleModel: 'Hyundai Accent',
                    vehiclePlate: 'CV-5678-CD',
                    vehicleColor: 'Azul',
                    licenseNumber: 'CV987654321',
                    rating: 4.9,
                    totalRides: 312,
                    isAvailable: true,
                    currentLatitude: 16.1750,
                    currentLongitude: -22.9120,
                },
            },
        },
    });
    const driver3 = await prisma.user.upsert({
        where: { email: 'antonio@example.com' },
        update: {},
        create: {
            email: 'antonio@example.com',
            password,
            name: 'António Fernandes',
            phone: '+238 998 3333',
            userType: 'DRIVER',
            photoUrl: 'https://i.pravatar.cc/150?img=68',
            driverProfile: {
                create: {
                    vehicleModel: 'Nissan Sentra',
                    vehiclePlate: 'CV-9012-EF',
                    vehicleColor: 'Prata',
                    licenseNumber: 'CV456789123',
                    rating: 4.7,
                    totalRides: 189,
                    isAvailable: false,
                    currentLatitude: 16.1800,
                    currentLongitude: -22.9080,
                },
            },
        },
    });
    const driver4 = await prisma.user.upsert({
        where: { email: 'jose@example.com' },
        update: {},
        create: {
            email: 'jose@example.com',
            password,
            name: 'José Rodrigues',
            phone: '+238 998 4444',
            userType: 'DRIVER',
            photoUrl: 'https://i.pravatar.cc/150?img=14',
            driverProfile: {
                create: {
                    vehicleModel: 'Volkswagen Polo',
                    vehiclePlate: 'CV-3456-GH',
                    vehicleColor: 'Preto',
                    licenseNumber: 'CV789123456',
                    rating: 5.0,
                    totalRides: 425,
                    isAvailable: true,
                    currentLatitude: 16.1720,
                    currentLongitude: -22.9140,
                },
            },
        },
    });
    console.log('Drivers created');
    const touristSpots = [
        {
            namePT: 'Praia de Santa Mónica',
            nameEN: 'Santa Mónica Beach',
            descriptionPT: 'Uma das praias mais bonitas do mundo, com 18 km de areia branca e fina. É um santuário de tartarugas marinhas e oferece vistas espetaculares do oceano Atlântico.',
            descriptionEN: 'One of the most beautiful beaches in the world, with 18 km of white and fine sand. It is a sea turtle sanctuary and offers spectacular views of the Atlantic Ocean.',
            tipsPT: 'Leve proteção solar, água e lanches. A praia é remota e não há vendedores. Melhor visitar com maré baixa.',
            tipsEN: 'Bring sunscreen, water and snacks. The beach is remote with no vendors. Best to visit at low tide.',
            latitude: 16.0548,
            longitude: -22.8846,
            imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        },
        {
            namePT: 'Deserto de Viana',
            nameEN: 'Viana Desert',
            descriptionPT: 'Um deserto de dunas de areia branca espetaculares no meio da ilha. Um fenómeno único em Cabo Verde que oferece paisa gens lunar es incríveis.',
            descriptionEN: 'A desert of spectacular white sand dunes in the middle of the island. A unique phenomenon in Cape Verde offering incredible lunar landscapes.',
            tipsPT: 'Ideal para passeios de buggy ou caminhadas. Visite ao nascer ou pôr do sol para as melhores fotos. Use calçado fechado.',
            tipsEN: 'Ideal for buggy tours or hiking. Visit at sunrise or sunset for best photos. Wear closed shoes.',
            latitude: 16.1333,
            longitude: -22.8667,
            imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800',
        },
        {
            namePT: 'Praia de Ervatão',
            nameEN: 'Ervatão Beach',
            descriptionPT: 'Santuário de tartarugas marinhas onde se pode observar a desova entre junho e outubro. Águas cristalinas e areia dourada.',
            descriptionEN: 'Sea turtle sanctuary where you can observe nesting between June and October. Crystal clear waters and golden sand.',
            tipsPT: 'Respeite as áreas de nidificação. Não use flash à noite. Melhor época: junho a outubro para ver tartarugas.',
            tipsEN: 'Respect nesting areas. No flash at night. Best season: June to October to see turtles.',
            latitude: 16.2000,
            longitude: -22.8500,
            imageUrl: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800',
        },
        {
            namePT: 'Ilhéu de Sal Rei',
            nameEN: 'Sal Rei Islet',
            descriptionPT: 'Pequena ilha em frente a Sal Rei com águas cristalinas perfeitas para snorkeling. Lar de diversas espécies de aves marinhas.',
            descriptionEN: 'Small island off Sal Rei with crystal clear waters perfect for snorkeling. Home to various seabird species.',
            tipsPT: 'Acessível de barco (15 min). Leve equipamento de snorkeling. Ótimo para observação de aves e pesca.',
            tipsEN: 'Accessible by boat (15 min). Bring snorkeling equipment. Great for birdwatching and fishing.',
            latitude: 16.1833,
            longitude: -22.9167,
            imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        },
    ];
    for (const spot of touristSpots) {
        await prisma.touristSpot.upsert({
            where: { namePT: spot.namePT },
            update: {},
            create: spot,
        });
    }
    console.log('Tourist spots created');
    const restaurants = [
        {
            name: 'Restaurante Perola',
            cuisine: 'Cabo-verdiana',
            descriptionPT: 'Restaurante tradicional oferecendo pratos autênticos de Cabo Verde. Especialidade em cachupa e peixe fresco.',
            descriptionEN: 'Traditional restaurant offering authentic Cape Verdean dishes. Specializing in cachupa and fresh fish.',
            phone: '+238 251 1234',
            address: 'Rua da Praia, Sal Rei',
            latitude: 16.1780,
            longitude: -22.9100,
            openingHours: '12:00-22:00',
            imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        },
        {
            name: 'Tortuga Beach Resort Restaurant',
            cuisine: 'Internacional',
            descriptionPT: 'Culinária internacional com vista para o mar. Ambiente elegante e romântico, ideal para jantares especiais.',
            descriptionEN: 'International cuisine with ocean views. Elegant and romantic atmosphere, ideal for special dinners.',
            phone: '+238 251 2345',
            address: 'Praia de Chaves',
            latitude: 16.1650,
            longitude: -22.9200,
            openingHours: '07:00-23:00',
            imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
        },
        {
            name: 'Esplanada Santa Isabel',
            cuisine: 'Frutos do Mar',
            descriptionPT: 'Especializado em frutos do mar frescos e lagosta. Localização privilegiada no centro de Sal Rei.',
            descriptionEN: 'Specializing in fresh seafood and lobster. Prime location in the center of Sal Rei.',
            phone: '+238 251 3456',
            address: 'Praça Santa Isabel, Sal Rei',
            latitude: 16.1775,
            longitude: -22.9095,
            openingHours: '11:00-23:00',
            imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
        },
        {
            name: 'Morabeza Beach Club',
            cuisine: 'Mediterrânea',
            descriptionPT: 'Bar de praia com comida mediterrânea e cocktails. Música ao vivo aos fins de semana.',
            descriptionEN: 'Beach bar with Mediterranean food and cocktails. Live music on weekends.',
            phone: '+238 251 4567',
            address: 'Praia de Cruz',
            latitude: 16.1700,
            longitude: -22.9150,
            openingHours: '10:00-02:00',
            imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
        },
        {
            name: 'Casa Velha',
            cuisine: 'Portuguesa',
            descriptionPT: 'Culinária portuguesa em ambiente colonial restaurado. Especialidade em bacalhau e vinhos portugueses.',
            descriptionEN: 'Portuguese cuisine in a restored colonial setting. Specializing in cod fish and Portuguese wines.',
            phone: '+238 251 5678',
            address: 'Rua 5 de Julho, Sal Rei',
            latitude: 16.1785,
            longitude: -22.9105,
            openingHours: '18:00-23:00',
            imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
        },
        {
            name: 'Sodade di Nos Terra',
            cuisine: 'Cabo-verdiana',
            descriptionPT: 'Cozinha crioula tradicional com música ao vivo todas as noites. Ambiente familiar e acolhedor.',
            descriptionEN: 'Traditional Creole cuisine with live music every night. Welcoming family atmosphere.',
            phone: '+238 251 6789',
            address: 'Avenida Amilcar Cabral, Sal Rei',
            latitude: 16.1790,
            longitude: -22.9110,
            openingHours: '12:00-23:00',
            imageUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
        },
    ];
    for (const restaurant of restaurants) {
        await prisma.restaurant.upsert({
            where: { name: restaurant.name },
            update: {},
            create: restaurant,
        });
    }
    console.log('Restaurants created');
    const hotels = [
        {
            name: 'Hotel Riu Touareg',
            stars: 5,
            descriptionPT: 'Resort de luxo all-inclusive à beira-mar. Oferece spa, múltiplos restaurantes, piscinas e acesso direto à praia.',
            descriptionEN: 'Luxury all-inclusive beachfront resort. Features spa, multiple restaurants, pools and direct beach access.',
            phone: '+238 251 7890',
            address: 'Praia de Chaves',
            latitude: 16.1640,
            longitude: -22.9210,
            imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        },
        {
            name: 'Royal Horizons Boa Vista',
            stars: 4,
            descriptionPT: 'Hotel moderno com vista para o oceano. Inclui piscina infinity, ginásio e restaurante internacional.',
            descriptionEN: 'Modern hotel with ocean views. Includes infinity pool, gym and international restaurant.',
            phone: '+238 251 8901',
            address: 'Praia de Chaves',
            latitude: 16.1655,
            longitude: -22.9205,
            imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        },
        {
            name: 'Marine Club Beach Resort',
            stars: 4,
            descriptionPT: 'Resort familiar com animação para crianças. Piscinas, desportos aquáticos e entretenimento noturno.',
            descriptionEN: 'Family resort with kids animation. Pools, water sports and evening entertainment.',
            phone: '+238 251 9012',
            address: 'Praia de Chaves',
            latitude: 16.1660,
            longitude: -22.9195,
            imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        },
        {
            name: 'Hotel Parque das Dunas',
            stars: 3,
            descriptionPT: 'Hotel boutique aconchegante no centro de Sal Rei. Quartos confortáveis e staff atencioso.',
            descriptionEN: 'Cozy boutique hotel in the center of Sal Rei. Comfortable rooms and attentive staff.',
            phone: '+238 251 0123',
            address: 'Rua de Santa Isabel, Sal Rei',
            latitude: 16.1770,
            longitude: -22.9090,
            imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
        },
        {
            name: 'Iberostar Club Boa Vista',
            stars: 5,
            descriptionPT: 'Resort premium all-inclusive com design contemporâneo. Múltiplas opções gastronómicas e spa de classe mundial.',
            descriptionEN: 'Premium all-inclusive resort with contemporary design. Multiple dining options and world-class spa.',
            phone: '+238 251 1235',
            address: 'Praia de Chaves',
            latitude: 16.1645,
            longitude: -22.9215,
            imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        },
        {
            name: 'Spinguera Ecolodge',
            stars: 3,
            descriptionPT: 'Ecolodge sustentável com bangalós tradicionais. Perfeito para viajantes conscientes do ambiente.',
            descriptionEN: 'Sustainable ecolodge with traditional bungalows. Perfect for environmentally conscious travelers.',
            phone: '+238 251 2346',
            address: 'Norte da Ilha',
            latitude: 16.1900,
            longitude: -22.8900,
            imageUrl: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
        },
    ];
    for (const hotel of hotels) {
        await prisma.hotel.upsert({
            where: { name: hotel.name },
            update: {},
            create: hotel,
        });
    }
    console.log('Hotels created');
    console.log('Database seeding completed successfully!');
}
main()
    .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map