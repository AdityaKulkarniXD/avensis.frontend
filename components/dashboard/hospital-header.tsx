"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Heart, Bell, Settings, LogOut, User, Building } from 'lucide-react';

interface HospitalHeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    hospitalName?: string;
  };
}

export default function HospitalHeader({ user }: HospitalHeaderProps) {
  const router = useRouter();
  const [notifications] = useState(7);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">PS3WAD</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard/hospital" className="text-gray-700 hover:text-blue-600 font-medium">
              Dashboard
            </Link>
            <Link href="/doctors" className="text-gray-700 hover:text-blue-600 font-medium">
              Doctors
            </Link>
            <Link href="/patients" className="text-gray-700 hover:text-blue-600 font-medium">
              Patients
            </Link>
            <Link href="/departments" className="text-gray-700 hover:text-blue-600 font-medium">
              Departments
            </Link>
            <Link href="/analytics" className="text-gray-700 hover:text-blue-600 font-medium">
              Analytics
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatars/hospital.jpg" alt={user.name} />
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.hospitalName || 'PS3WAD Medical Center'}
                    </p>
                    <Badge variant="secondary" className="w-fit text-xs">
                      <Building className="h-3 w-3 mr-1" />
                      Hospital
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}