// /components/NavBar.tsx
import { useEffect, useState } from 'react';

interface PlatformVersion {
    platform: string;
    versions: string[];
}

interface NavbarProps {
    onPlatformChange: (platform: string) => void;
    onVersionChange: (version: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
    onPlatformChange,
    onVersionChange,
}) => {
    const [platforms, setPlatforms] = useState<PlatformVersion[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<string>('');
    const [selectedVersion, setSelectedVersion] = useState<string>('');

    useEffect(() => {
        // Fetch platforms and versions from the API
        fetch('/api/platform-versions')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setPlatforms(data.data); // Set platforms with the data from the API
                }
            })
            .catch(error =>
                console.error('Error fetching platform versions:', error)
            );
    }, []);

    const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPlatform = e.target.value;
        setSelectedPlatform(selectedPlatform);
        onPlatformChange(selectedPlatform);
        setSelectedVersion(''); // Reset version when platform changes
    };

    const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedVersion = e.target.value;
        setSelectedVersion(selectedVersion);
        onVersionChange(selectedVersion);
    };

    return (
        <div>
            <select value={selectedPlatform} onChange={handlePlatformChange}>
                <option value="">Select Platform</option>
                {platforms.map(platform => (
                    <option key={platform.platform} value={platform.platform}>
                        {platform.platform}
                    </option>
                ))}
            </select>

            <select
                value={selectedVersion}
                onChange={handleVersionChange}
                disabled={!selectedPlatform}>
                <option value="">Select Version</option>
                {platforms
                    .find(p => p.platform === selectedPlatform)
                    ?.versions.map(version => (
                        <option key={version} value={version}>
                            {version}
                        </option>
                    ))}
            </select>
        </div>
    );
};

export default Navbar;