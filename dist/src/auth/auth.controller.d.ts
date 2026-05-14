import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            phone: string;
            photoUrl: string | null;
            userType: import("@prisma/client").$Enums.UserType;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            phone: string;
            photoUrl: string | null;
            userType: import("@prisma/client").$Enums.UserType;
        };
    }>;
    getProfile(user: any): Promise<{
        driverProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            vehicleModel: string;
            vehiclePlate: string;
            vehicleColor: string;
            licenseNumber: string;
            rating: number;
            totalRides: number;
            isAvailable: boolean;
            currentLatitude: number | null;
            currentLongitude: number | null;
            userId: string;
        } | null;
        id: string;
        email: string;
        name: string;
        phone: string;
        photoUrl: string | null;
        preferredLanguage: string;
        userType: import("@prisma/client").$Enums.UserType;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(user: any, updateProfileDto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        name: string;
        phone: string;
        photoUrl: string | null;
        preferredLanguage: string;
        userType: import("@prisma/client").$Enums.UserType;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
