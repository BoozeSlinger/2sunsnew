import Link from "next/link";
import Image from "next/image";
import { Share2, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] border-t border-white/5 pt-20 pb-10">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Two Suns Logo"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
          <p className="text-white/60 leading-relaxed max-w-xs">
            Professional pressure washing and soft washing services for Riverside and the Inland Empire. Bold quality, local trust.
          </p>
          <div className="flex gap-4">
            <Link 
              href="#" 
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#5AC83A] transition-all duration-300 ease-in-out"
              aria-label="Visit our Facebook page"
            >
              <Share2 size={20} />
            </Link>
            <Link 
              href="#" 
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#5AC83A] transition-all duration-300 ease-in-out"
              aria-label="Visit our Instagram page"
            >
              <Share2 size={20} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-white/60">
            <li><Link href="#services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="#gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            <li><Link href="#why-us" className="hover:text-white transition-colors">Why Choose Us</Link></li>
            <li><Link href="#testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
            <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Services</h4>
          <ul className="flex flex-col gap-4 text-white/60">
            <li>House Washing</li>
            <li>Driveway Cleaning</li>
            <li>Roof Soft Washing</li>
            <li>Deck Restoration</li>
            <li>Fence Cleaning</li>
            <li>Commercial Washing</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
          <ul className="flex flex-col gap-4 text-white/60">
            <li className="flex gap-3">
              <Phone className="text-[#5AC83A] shrink-0" size={20} />
              <span>(951) 555-0123</span>
            </li>
            <li className="flex gap-3">
              <Mail className="text-[#5AC83A] shrink-0" size={20} />
              <span>quotes@twosuns.com</span>
            </li>
            <li className="flex gap-3">
              <MapPin className="text-[#5AC83A] shrink-0" size={20} />
              <span>Riverside, CA 92501</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
        <p>© 2026 Two Suns Pressure Washing. All Rights Reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
