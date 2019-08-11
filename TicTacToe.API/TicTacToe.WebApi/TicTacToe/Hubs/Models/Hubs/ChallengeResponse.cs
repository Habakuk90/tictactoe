namespace TicTacToe.WebApi.TicTacToe.Hubs.Models.Hubs
{
    public class ChallengeResponse
    {
        /// <summary>
        /// Name of the challenged enemy.
        /// </summary>
        public string EnemyName { get; set; }

        /// <summary>
        /// Name of the challenged game.
        /// </summary>
        public string GameName { get; set; }

        /// <summary>
        /// State of the Response given by the enemy.
        /// </summary>
        public ModalStates Response { get; set; }
    }
}
