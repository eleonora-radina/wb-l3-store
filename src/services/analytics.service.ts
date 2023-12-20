export enum EventType {
  Route = "route",
  ViewCard = "viewCard",
  ViewCardPromo = "viewCardPromo",
  AddToCart = "addToCart",
  Purchase = "purchase",
}

class AnalyticsService {
  sendEvent (type: EventType, payload: any) {
   return fetch('/api/sendEvent', {
    method: 'POST',
    body: JSON.stringify({
      type: type,
      payload: payload,
      timestamp: Date.now()
    })
  });
  }
}

export const analyticsService = new AnalyticsService();