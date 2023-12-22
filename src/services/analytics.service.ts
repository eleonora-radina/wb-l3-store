export enum EventType {
  Route = "route",
  ViewCard = "viewCard",
  ViewCardPromo = "viewCardPromo",
  AddToCart = "addToCart",
  Purchase = "purchase",
}

class AnalyticsService {

  sendEvent(type: EventType, payload: any) {
    if (type === EventType.ViewCard) {
      if (Object.entries(payload.product!.log).length !== 0) {
        type = EventType.ViewCardPromo;
      }
    }

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