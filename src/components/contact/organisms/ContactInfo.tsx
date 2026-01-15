import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Heading } from "../../shared/atoms";

interface ContactSettings {
    contact_address?: string;
    contact_phone?: string;
    contact_email?: string;
    contact_hours?: string;
    map_embed_url?: string;
}

const ContactItem = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-red-50 transition-colors duration-200">
        <div className="p-3 bg-red-100 text-red-600 rounded-lg flex-shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
            <p className="text-gray-600 text-sm">{content}</p>
        </div>
    </div>
);

const ContactInfo = () => {
    const [settings, setSettings] = useState<ContactSettings>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/cms/settings');
                if (res.ok) {
                    const data = await res.json();
                    setSettings(data);
                }
            } catch (error) {
                console.error('Failed to fetch contact settings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    // Fallback values if CMS Settings not configured yet
    const address = settings.contact_address || 'Gedung Merdeka Lt. 5, Jl. Jend. Sudirman No. 123, Jakarta Selatan, 12190';
    const phone = settings.contact_phone || '+62 812-3456-7890';
    const email = settings.contact_email || 'info@lpkmerdeka.co.id';
    const hours = settings.contact_hours || 'Senin - Jumat, 09:00 - 17:00 WIB';
    const mapsEmbed = settings.map_embed_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.96205705335!2d106.73365319409848!3d-6.284242637256965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1717382348234!5m2!1sid!2sid';

    if (loading) {
        return (
            <div className="bg-white p-8 rounded-2xl border border-gray-100 h-full animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex gap-4 p-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-48"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 h-full">
            <Heading className="text-2xl mb-6">Hubungi Kami</Heading>

            <div className="space-y-2">
                <ContactItem
                    icon={<MapPin className="w-5 h-5" />}
                    title="Lokasi Kantor"
                    content={address}
                />
                <ContactItem
                    icon={<Phone className="w-5 h-5" />}
                    title="Telepon / WhatsApp"
                    content={phone}
                />
                <ContactItem
                    icon={<Mail className="w-5 h-5" />}
                    title="Alamat Email"
                    content={email}
                />
                <ContactItem
                    icon={<Clock className="w-5 h-5" />}
                    title="Jam Operasional"
                    content={hours}
                />
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-sm mb-4">Temukan kami di Google Maps</p>

                {/* Show iframe only if valid embed URL is provided */}
                {mapsEmbed && mapsEmbed.includes('google.com/maps/embed') ? (
                    <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                        <iframe
                            src={mapsEmbed}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                ) : (
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400 text-sm">Peta tidak tersedia</p>
                    </div>
                )}

                {/* Button to open in Google Maps */}
                {(settings as any).map_share_url && (
                    <a
                        href={(settings as any).map_share_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                        <MapPin className="w-4 h-4" />
                        Buka di Google Maps
                    </a>
                )}
            </div>
        </div>
    );
};

export default ContactInfo;
