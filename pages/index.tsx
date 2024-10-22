// /pages/index.tsx
import { useState } from 'react';
import NavBar from '../components/NavBar';
import MainContent from '../components/MainContent';

export default function Home() {
    const [platform, setPlatform] = useState<string>('');
    const [version, setVersion] = useState<string>('');

    return (
        <div>
            <header>
                <h1>Game Database</h1>
                <a
                    href="https://github.com/your-repo-url"
                    target="_blank"
                    rel="noopener noreferrer">
                    GitHub
                </a>
            </header>

            <div style={{ display: 'flex' }}>
                <NavBar
                    onPlatformChange={setPlatform}
                    onVersionChange={setVersion}
                />
                <MainContent
                    selectedPlatform={platform}
                    selectedVersion={version}
                />
            </div>
        </div>
    );
}
