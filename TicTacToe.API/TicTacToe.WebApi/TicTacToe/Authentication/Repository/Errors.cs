namespace TicTacToe.WebApi.TicTacToe.Authentication.Repository
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc.ModelBinding;

    /// <summary>
    /// Class to Manage Error Handling
    /// </summary>
    public static class Errors
    {
        #region public static methods

        /// <summary>
        /// Add error to the Modelstate.
        /// </summary>
        /// <param name="identityResult">
        /// given identity result.
        /// </param>
        /// <param name="modelState">
        /// given modelstate where to add additional modelstates
        /// </param>
        /// <returns>
        /// returns the extenden modelState
        /// </returns>
        public static ModelStateDictionary AddErrorsToModelState(IdentityResult identityResult, ModelStateDictionary modelState)
        {
            foreach (IdentityError e in identityResult.Errors)
            {
                modelState.TryAddModelError(e.Code, e.Description);
            }

            return modelState;
        }

        /// <summary>
        /// Add Error to the Modelstate.
        /// </summary>
        /// <param name="code">
        /// Represents the error Code.
        /// </param>
        /// <param name="description">
        /// Description of the error code.
        /// </param>
        /// <param name="modelState">
        /// given model state where to add addtional Modelstates
        /// </param>
        /// <returns>
        /// returns the extenden modelState
        /// </returns>
        public static ModelStateDictionary AddErrorToModelState(string code, string description, ModelStateDictionary modelState)
        {
            modelState.TryAddModelError(code, description);
            return modelState;
        }

        #endregion
    }
}
