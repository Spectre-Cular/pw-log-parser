// File: components/MainContent.tsx
'use client';
// /components/MainContent.tsx
import { useEffect, useState } from 'react';

// Define TypeScript interface for an item
interface IItem {
    guid: string;
    name: string;
    location: {
        x: number;
        y: number;
        z: number;
    };
    platform: 'Steam' | 'Xbox';
    version: string;
}

interface MainContentProps {
    selectedPlatform: string;
    selectedVersion: string;
}

const MainContent: React.FC<MainContentProps> = ({
    selectedPlatform,
    selectedVersion,
}) => {
    const [items, setItems] = useState<IItem[]>([]);

    useEffect(() => {
        if (selectedPlatform && selectedVersion) {
            fetch(`/api/items/${selectedPlatform}/${selectedVersion}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setItems(data.data);
                    }
                })
                .catch(error => console.error('Error fetching items:', error));
        }
    }, [selectedPlatform, selectedVersion]);

    return (
        <table>
            <thead>
                <tr>
                    <th>GUID</th>
                    <th>Name</th>
                    <th>Location (x,y,z)</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.guid}>
                        <td>{item.guid}</td>
                        <td>{item.name}</td>
                        <td>{`(${item.location.x}, ${item.location.y}, ${item.location.z})`}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MainContent;
