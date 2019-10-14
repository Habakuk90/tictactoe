
namespace ChatHub.Tests
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Moq;

    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public async Task OnBroadcast_Send_Message_To_All()
        {
            // arrange
            Mock<IHubCallerClients<IChatClient>> mockClients =
                new Mock<IHubCallerClients<IChatClient>>();
            Mock<IChatClient> mockClientProxy = new Mock<IChatClient>();

            mockClients.Setup(clients => clients.All).Returns(mockClientProxy.Object);


            ChatHub chatHub = new ChatHub()
            {
                Clients = mockClients.Object
            };

            // act
            await chatHub.BroadcastMessage("test works");


            // assert
            mockClients.Verify(clients => clients.All, Times.Once);
            mockClients.Verify(clients => 
                clients.All.SendMessage(It.Is<string>(x => x.Equals("test works"))),
                Times.Once);
            mockClientProxy.Verify(
                clientProxy => clientProxy.SendMessage(
                    It.Is<string>(x => !string.IsNullOrEmpty(x))),
                Times.Once);
        }
    }
}

