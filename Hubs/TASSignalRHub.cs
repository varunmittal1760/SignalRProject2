using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

public class TASSignalRHub : Hub
{
    public async Task SubscribeTAS(string instrumentId, string clientId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, instrumentId);
        await Clients.Group(instrumentId).SendAsync("OnUpdate", $"Subscribed to instrument {instrumentId} for client {clientId}");
    }

    public async Task UnsubscribeTAS(string instrumentId, string clientId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, instrumentId);
        await Clients.Group(instrumentId).SendAsync("OnUpdate", $"Unsubscribed from instrument {instrumentId} for client {clientId}");
    }
}

