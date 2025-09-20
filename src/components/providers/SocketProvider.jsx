import { useEffect, useMemo, useRef, useState, createContext } from 'react';
import { observer } from 'mobx-react-lite';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useStore } from '@/hooks/useStore.js';

const SocketContext = createContext(null);

export const SocketProvider = observer(({ children }) => {
  const { incidents, newsMap, news } = useStore();
  const [connected, setConnected] = useState(false);

  const stompRef = useRef(null);
  const sockRef = useRef(null);
  const retryRef = useRef({ timer: null, explicitlyClosed: false });

  const wsUrl = `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_NODE}/ws`;

  useEffect(() => {
    let cancelled = false;
    retryRef.current.explicitlyClosed = false;

    const sock = new SockJS(wsUrl, null, {
      transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
      transportOptions: {
        'xhr-streaming': { withCredentials: true },
        'xhr-polling': { withCredentials: true },
      },
      timeout: 10000, // ms
    });

    const stomp = Stomp.over(sock);
    stomp.debug = () => {};

    stomp.heartbeat.outgoing = 20000;
    stomp.heartbeat.incoming = 0;

    const onConnect = () => {
      if (cancelled) return;
      setConnected(true);

      stomp.subscribe('/topic/all', (message) => {
        try {
          const payload = JSON.parse(message.body);
          incidents.setIncidents([payload]);
        } catch (e) {
          console.warn('bad incident payload', e);
        }
      });

      stomp.subscribe('/topic/news', (message) => {
        try {
          const payload = JSON.parse(message.body);
          news.setNews([payload]);
        } catch (e) {
          console.warn('bad news payload', e);
        }
      });

      stomp.subscribe('/topic/sensors', (message) => {
        try {
          const sensor = JSON.parse(message.body);
          console.log('New sensor data:', sensor);
        } catch (e) {
          console.warn('bad sensor payload', e);
        }
      });
    };

    const scheduleReconnect = () => {
      if (retryRef.current.explicitlyClosed) return;
      clearTimeout(retryRef.current.timer);
      retryRef.current.timer = setTimeout(() => {
        setConnected(false);
      }, 3000);
    };

    const onError = (err) => {
      if (cancelled) return;
      console.warn('STOMP error:', err);
      setConnected(false);
      scheduleReconnect();
    };

    stomp.connect({}, onConnect, onError);

    stompRef.current = stomp;
    sockRef.current = sock;

    return () => {
      cancelled = true;
      retryRef.current.explicitlyClosed = true;
      clearTimeout(retryRef.current.timer);

      try {
        stompRef.current?.disconnect(() => setConnected(false));
      } catch {}
      try {
        sockRef.current?.close?.();
      } catch {}

      stompRef.current = null;
      sockRef.current = null;
    };
  }, [wsUrl]);

  const value = useMemo(
    () => ({
      connected,
      stomp: stompRef.current,
      news,
      incidents,
      newsMap,
    }),
    [connected, news, incidents, newsMap],
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
});
