import { Facebook, Mail, MapPin, Phone, Globe } from 'lucide-react';

export function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white">CSC</span>
              </div>
              <div>
                <h3 className="text-white">Central Student Council</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              The official student government organization of PUP Santa Tomas Campus, 
              dedicated to serving the student body and fostering academic excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#announcements" className="hover:text-primary transition-colors">Announcements</a>
              </li>
              <li>
                <a href="#events" className="hover:text-primary transition-colors">Events</a>
              </li>
              <li>
                <a href="#facebook" className="hover:text-primary transition-colors">Facebook Pages</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact Information</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>PUP Santa Tomas Campus<br/>Batangas, Philippines</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+63 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>csc@pupstc.edu.ph</span>
              </li>
              <li className="flex items-center gap-2">
                <Facebook className="h-4 w-4 flex-shrink-0" />
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  @PUPSTCCSC
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p>&copy; {currentYear} Central Student Council - PUP Santa Tomas Campus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
