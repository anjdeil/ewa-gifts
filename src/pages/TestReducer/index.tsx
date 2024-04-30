import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { postAPI } from "@/services/PostServices";
import { fetchUsers } from "@/store/reducers/ActionCreators";

const TestReducer = () =>
{
  const dispatch = useAppDispatch();
  const { users, error, isLoading } = useAppSelector(state => state.TestSlice);

  const { data: posts, } = postAPI.useFetchAllPostsQuery(10); // You can get error and isLoading, refetch()
  console.log(posts);

  return (
    <div>
      <button onClick={() => dispatch(fetchUsers())}>
        Click
        {error && error}
        {isLoading && 'Loading...'}
      </button>
      {(users.length > 0) && JSON.stringify(users, null, 2)}
    </div>
  )
}

export default TestReducer;
