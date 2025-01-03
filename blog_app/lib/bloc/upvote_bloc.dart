import 'package:flutter_bloc/flutter_bloc.dart';

class UpvoteState {
  final bool isUpvoted;
  final bool isDownvoted;

  UpvoteState({this.isUpvoted = false, this.isDownvoted = false});

  UpvoteState copyWith({bool? isUpvoted, bool? isDownvoted}) {
    return UpvoteState(
      isUpvoted: isUpvoted ?? this.isUpvoted,
      isDownvoted: isDownvoted ?? this.isDownvoted,
    );
  }
}

abstract class UpvoteEvent {}

class ToggleUpvoteEvent extends UpvoteEvent {}

class ToggleDownvoteEvent extends UpvoteEvent {}

class UpvoteBloc extends Bloc<UpvoteEvent, UpvoteState> {
  UpvoteBloc() : super(UpvoteState()) {
    on<ToggleUpvoteEvent>((event, emit) {
      emit(state.copyWith(
        isUpvoted: !state.isUpvoted,
        isDownvoted: state.isUpvoted
            ? false
            : false, // Reset downvote if toggling upvote
      ));
    });

    on<ToggleDownvoteEvent>((event, emit) {
      emit(state.copyWith(
        isDownvoted: !state.isDownvoted,
        isUpvoted: state.isDownvoted
            ? false
            : false, // Reset upvote if toggling downvote
      ));
    });
  }
}
