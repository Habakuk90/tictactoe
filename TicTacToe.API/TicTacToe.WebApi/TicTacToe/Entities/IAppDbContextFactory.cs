namespace TicTacToe.WebApi.TicTacToe.Entities
{
    public interface IAppDbContextFactory<T>
    { 
        T CreateDbContext();
    }
}