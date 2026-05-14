export declare class CreateRideDto {
    pickupAddress: string;
    pickupLatitude: number;
    pickupLongitude: number;
    destinationAddress: string;
    destinationLatitude: number;
    destinationLongitude: number;
    paymentMethod: 'CASH' | 'CARD';
}
