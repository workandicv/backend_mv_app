export declare class DriverProfileDto {
    vehicleModel: string;
    vehiclePlate: string;
    vehicleColor: string;
    licenseNumber: string;
}
export declare class RegisterDto {
    email: string;
    password: string;
    name: string;
    phone: string;
    userType: 'PASSENGER' | 'DRIVER';
    photoUrl?: string;
    driverProfile?: DriverProfileDto;
}
