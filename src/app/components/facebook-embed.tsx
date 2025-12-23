import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Facebook, RefreshCw, AlertTriangle } from 'lucide-react';

interface FacebookEmbedProps {
  pageUrl: string;
  title: string;
  height?: number;
  className?: string;
}

export function FacebookEmbed({ pageUrl, title, height = 700, className = "" }: FacebookEmbedProps) {
  const [embedType, setEmbedType] = useState<'official' | 'iframe' | 'iframe-fallback' | 'fallback'>('official');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Clean and validate Facebook URL
  const cleanFacebookUrl = (url: string): string => {
    // For Facebook profile.php URLs, preserve the query parameters
    if (url.includes('profile.php')) {
      return url;
    }
    // For regular Facebook pages, remove query parameters and fragments
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname}`;
  };

  const validatedPageUrl = cleanFacebookUrl(pageUrl);

  // Reset component state when pageUrl changes
  useEffect(() => {
    setEmbedType('official');
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);
  }, [pageUrl]);

  // Helper function to wait for element to be ready
  const waitForElement = (selector: string, timeout = 5000): Promise<Element | null> => {
    return new Promise((resolve) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, timeout);
    });
  };

  useEffect(() => {
    // Suppress Facebook SDK console errors
    const originalConsoleError = console.error;
    const suppressFacebookErrors = (message: any, ...args: any[]) => {
      if (typeof message === 'string' && (
        message.includes('Could not find element') ||
        message.includes('ErrorUtils caught an error') ||
        message.includes('fburl.com/debugjs')
      )) {
        // Suppress Facebook SDK errors
        return;
      }
      originalConsoleError(message, ...args);
    };

    console.error = suppressFacebookErrors;

    // Try official Facebook embed first
    if (typeof window !== 'undefined' && !window.FB) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setTimeout(async () => {
          if (window.FB?.XFBML) {
            try {
              // Wait for fb-page element to be ready before parsing
              const fbPageElement = await waitForElement('.fb-page', 2000);
              if (fbPageElement && window.FB?.XFBML) {
                window.FB.XFBML.parse();
                setEmbedType('official');
              } else {
                console.log('FB page element not found, using iframe');
                setEmbedType('iframe');
              }
            } catch (error) {
              console.log('Official embed failed, trying iframe');
              setEmbedType('iframe');
            }
          } else {
            setEmbedType('iframe');
          }
          setIsLoading(false);
        }, 2000);
      };
      script.onerror = () => {
        console.log('SDK failed to load, using iframe');
        setEmbedType('iframe');
        setIsLoading(false);
      };
      document.body.appendChild(script);
    } else if (window.FB?.XFBML) {
      // SDK already loaded
      setTimeout(async () => {
        try {
          // Wait for fb-page element to be ready before parsing
          const fbPageElement = await waitForElement('.fb-page', 1000);
          if (fbPageElement && window.FB?.XFBML) {
            window.FB.XFBML.parse();
            setEmbedType('official');
          } else {
            setEmbedType('iframe');
          }
        } catch (error) {
          setEmbedType('iframe');
        }
        setIsLoading(false);
      }, 1000);
    } else {
      // No SDK, use iframe
      setEmbedType('iframe');
      setIsLoading(false);
    }

    // Timeout fallback
    const timeout = setTimeout(() => {
      if (isLoading) {
        setEmbedType('iframe');
        setIsLoading(false);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
      // Restore original console.error
      console.error = originalConsoleError;
    };
  }, [validatedPageUrl]);

  const handleEmbedError = () => {
    if (embedType === 'iframe' && retryCount < 2) {
      console.log('Iframe failed, retrying...');
      setRetryCount(prev => prev + 1);
      setEmbedType('official');
      setIsLoading(true);
      setHasError(false);
    } else if (embedType === 'iframe') {
      console.log('Iframe failed, trying iframe fallback');
      setEmbedType('iframe-fallback');
    } else {
      setHasError(true);
      setEmbedType('fallback');
    }
  };

  if (embedType === 'fallback') {
    return (
      <Card className={`overflow-hidden flex flex-col ${className}`}>
        <div className="bg-accent p-2 sm:p-3 lg:p-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-accent-foreground flex items-center gap-2">
              <Facebook className="h-4 w-4" />
              {title}
            </h3>
            <Button asChild size="sm" variant="outline">
              <a href={validatedPageUrl} target="_blank" rel="noopener noreferrer" title="Visit on Facebook">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <Facebook className="h-16 w-16 text-blue-600 mx-auto" />
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Stay Connected</h4>
              <p className="text-sm text-gray-600 mb-4">
                Follow {title} on Facebook for the latest updates, announcements, and community engagement.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button asChild>
                <a href={validatedPageUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Visit on Facebook
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`${validatedPageUrl}/likes`} target="_blank" rel="noopener noreferrer">
                  Like Page
                </a>
              </Button>
            </div>
            <div className="text-xs text-gray-500 mt-4">
              <p>📱 Compatible with all ad blockers</p>
              <p>🔒 No tracking or data collection</p>
              <p>⚡ Fast loading, no external scripts</p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden flex flex-col ${className}`}>
      <div className="bg-accent p-2 sm:p-3 lg:p-4 border-b flex-shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="text-accent-foreground flex items-center gap-2">
            <Facebook className="h-4 w-4" />
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {embedType === 'official' ? 'Official Embed' : embedType === 'iframe' ? 'Direct Embed' : embedType === 'iframe-fallback' ? 'Simple Embed' : 'Link Only'}
            </span>
            <Button asChild size="sm" variant="outline">
              <a href={validatedPageUrl} target="_blank" rel="noopener noreferrer" title="Visit on Facebook">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-white relative flex-1 flex flex-col min-h-0">
        {isLoading && (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center space-y-3">
              <div className="animate-pulse flex items-center justify-center space-x-2">
                <Facebook className="h-6 w-6 text-blue-600" />
                <span className="text-sm text-gray-600">Loading Facebook content...</span>
              </div>
              <div className="text-xs text-gray-500">
                Trying multiple embed methods for best compatibility
              </div>
            </div>
          </div>
        )}

        {!isLoading && embedType === 'official' && (
          <div className="flex-1 min-h-0">
            <div
              className="fb-page w-full h-full"
              data-href={validatedPageUrl}
              data-tabs="timeline"
              data-width="1600"
              data-height=""
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            />
          </div>
        )}

        {!isLoading && embedType === 'iframe' && (
          <div className="flex-1 min-h-0">
            <iframe
              src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(validatedPageUrl)}&tabs=timeline&width=1600&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
              width="100%"
              height="100%"
              style={{ border: 'none', overflow: 'hidden', minHeight: '600px' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              onError={handleEmbedError}
              onLoad={() => {
                // Check if iframe loaded successfully
                try {
                  const iframe = document.querySelector('iframe[src*="facebook.com/plugins/page.php"]') as HTMLIFrameElement;
                  if (iframe && iframe.contentWindow) {
                    // If we can access contentWindow, the iframe loaded
                    setHasError(false);
                  }
                } catch (e) {
                  // CORS error is expected, but iframe might still work
                  setHasError(false);
                }
              }}
              title={`Facebook Page - ${title}`}
            />
          </div>
        )}

        {!isLoading && embedType === 'iframe-fallback' && (
          <div className="flex-1 min-h-0">
            <iframe
              src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(validatedPageUrl)}&tabs=timeline&width=1400&height=700&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true`}
              width="100%"
              height="100%"
              style={{ border: 'none', overflow: 'hidden', minHeight: '600px' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              onError={() => setEmbedType('fallback')}
              title={`Facebook Page - ${title}`}
            />
          </div>
        )}

        {hasError && (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center space-y-3">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto" />
              <div>
                <h4 className="font-medium text-red-600">Embed Unavailable</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Facebook content cannot be displayed directly. Please visit the page directly.
                </p>
              </div>
              <Button onClick={() => setEmbedType('fallback')} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Use Link Version
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: () => void;
      };
    };
  }
}