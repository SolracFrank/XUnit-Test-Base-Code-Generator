
public class GetUserByIdQueryTest
{
    private readonly GetUserByIdQueryHandler _sut;
    private readonly IUnitOfWork _unitOfWork = Substitute.For<IUnitOfWork>();

    private readonly ILogger<GetUserByIdQueryHandler> _logger = Substitute.For<ILogger<GetUserByIdQueryHandler>>();
    public GetUserByIdQueryTest()
    {
        _sut = new GetUserByIdQueryHandler(_unitOfWork, _logger);
    }

    [Fact]
    public async Task Get_User_By_Id_Expects_Expects_Incorrect()
    {
        //Arrange
        //Act
        //Assert
    }

}
