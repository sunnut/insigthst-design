import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
// @ts-ignore
import markerIcon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
// @ts-ignore
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import styles from './view.module.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export interface Point {
  lat: number;
  lon: number;
}

// Helper component to handle map resizing
const MapResize = ({ isFullscreen }: { isFullscreen: boolean }) => {
  const map = useMap();
  useEffect(() => {
    // 立即调用一次，并在延迟后再调用一次以确保万无一失
    map.invalidateSize();
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [isFullscreen, map]);
  return null;
};

// Component to handle Geoman initialization
interface GeomanProps {
  onShapeChange: (result: Point[] | null) => void;
}

const GeomanControls = ({ onShapeChange }: GeomanProps) => {
  const map = useMap();
  const currentLayer = useRef<L.Layer | null>(null);

  useEffect(() => {
    if (!map) return;

    // Set up Geoman controls - 匹配理想效果的工具栏
    const initGeoman = () => {
      if (!map.pm) return;

      map.pm.addControls({
        position: 'topleft',
        drawMarker: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: true,
        drawPolygon: true,
        drawCircle: false,
        drawText: false,
        editMode: true,
        dragMode: true,
        cutPolygon: false,
        removalMode: true,
      });

      // Language setting
      map.pm.setLang('zh');
    };

    // 稍微延迟初始化，确保地图已完全就绪
    const timer = setTimeout(initGeoman, 100);

    const handleShapeEvent = (e: any) => {
      const { layer } = e;

      // If a new shape is drawn, remove the previous one
      if (currentLayer.current && currentLayer.current !== layer) {
        map.removeLayer(currentLayer.current);
      }

      currentLayer.current = layer;
      extractCoordinates(layer);
    };

    const extractCoordinates = (layer: any) => {
      let coords: Point[] = [];

      if (layer.getLatLngs) {
        const latLngs = layer.getLatLngs();
        // Handle nested arrays (polygons and rectangles return arrays of arrays)
        const flatLatLngs = Array.isArray(latLngs[0]) ? latLngs[0] : latLngs;
        coords = (flatLatLngs as any[]).map((ll: any) => ({
          lat: ll.lat,
          lon: ll.lng,
        }));
      }

      onShapeChange(coords);
    };

    // Events
    map.on('pm:create', handleShapeEvent);
    map.on('pm:remove', () => {
      currentLayer.current = null;
      onShapeChange(null);
    });

    // Handle edits
    map.on('pm:edit', (e: any) => {
      extractCoordinates(e.layer);
    });

    return () => {
      clearTimeout(timer);
      map.off('pm:create', handleShapeEvent);
      if (map.pm) map.pm.removeControls();
    };
  }, [map, onShapeChange]);

  return null;
};

export interface MapDrawingProps {
  onChange: (result: Point[]) => void;
}

export default function MapDrawing({ onChange }: MapDrawingProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // 中心点设为西安（中国地理中心附近）
  const center: [number, number] = [34.3416, 108.9398];

  const handleShapeChange = (points: Point[] | null) => {
    onChange(points || []);
  };

  return (
    <div className={`${styles.mapContainer} ${isFullscreen ? styles.isFullscreen : ''}`} ref={containerRef}>
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={true}
        className={styles.leafletWrapper}
        attributionControl={false}
      >
        <MapResize isFullscreen={isFullscreen} />
        <TileLayer
          className={styles.darkMapLayer}
          url="https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
          subdomains={["1", "2", "3", "4"]}
        />
        <GeomanControls onShapeChange={handleShapeChange} />
      </MapContainer>
      <button className={styles.fullscreenBtn} onClick={toggleFullscreen} title={isFullscreen ? "退出全屏" : "全屏"}>
        {isFullscreen ? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        )}
      </button>
    </div>
  );
}
