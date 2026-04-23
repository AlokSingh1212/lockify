import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const { width } = Dimensions.get('window');

const MOCK_POSTS = [
  {
    id: '1',
    user: 'Jordan.Tech',
    store: "Jordan's Tech",
    product: 'Nebula Mouse',
    price: 49,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&auto=format&fit=crop&q=60',
    description: 'The ultimate gaming mouse for precision and comfort.',
    themeColor: '#7c3aed'
  },
  {
    id: '2',
    user: 'Aria.Design',
    store: 'Aria Design',
    product: 'Minimalist Poster',
    price: 25,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=60',
    description: 'A touch of elegance for your workspace.',
    themeColor: '#ec4899'
  }
];

export default function HomeFeed() {
  return (
    <StyledView className="flex-1 bg-black pt-12">
      {/* IG Header */}
      <StyledView className="flex-row items-center justify-between px-4 py-2 border-b border-zinc-900">
        <StyledText className="text-2xl font-bold italic text-white" style={{ fontFamily: 'serif' }}>
          Lockify
        </StyledText>
        <StyledView className="flex-row items-center gap-6">
          <TouchableOpacity>
            <Heart size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
             <Send size={24} color="#fff" />
          </TouchableOpacity>
        </StyledView>
      </StyledView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stories Bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-4 px-4 border-b border-zinc-900">
          {[...Array(6)].map((_, i) => (
            <StyledView key={i} className="items-center mr-4">
              <StyledView className="w-20 h-20 rounded-full p-[2px] border-2 border-pink-600">
                <StyledView className="w-full h-full rounded-full bg-zinc-800" />
              </StyledView>
              <StyledText className="text-[10px] text-zinc-400 mt-1">user_{i+1}</StyledText>
            </StyledView>
          ))}
        </ScrollView>

        {/* Posts */}
        {MOCK_POSTS.map((post) => (
          <StyledView key={post.id} className="mb-4">
            {/* Post Header */}
            <StyledView className="flex-row items-center justify-between px-3 py-2">
              <StyledView className="flex-row items-center gap-3">
                <StyledView className="w-8 h-8 rounded-full bg-zinc-800" />
                <StyledText className="text-sm font-bold text-white">{post.user}</StyledText>
              </StyledView>
              <TouchableOpacity>
                <MoreHorizontal size={20} color="#fff" />
              </TouchableOpacity>
            </StyledView>

            {/* Post Image */}
            <StyledView style={{ width, height: width }} className="bg-zinc-900">
              {/* Image component would go here */}
              <StyledView className="flex-1 items-center justify-center">
                 <StyledText className="text-4xl font-bold text-white opacity-20">{post.product.charAt(0)}</StyledText>
              </StyledView>
            </StyledView>

            {/* Post Actions */}
            <StyledView className="px-3 py-3">
              <StyledView className="flex-row items-center justify-between">
                <StyledView className="flex-row items-center gap-4">
                  <TouchableOpacity>
                    <Heart size={26} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MessageCircle size={26} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Send size={26} color="#fff" />
                  </TouchableOpacity>
                </StyledView>
                <TouchableOpacity>
                  <Bookmark size={26} color="#fff" />
                </TouchableOpacity>
              </StyledView>

              {/* Likes & Caption */}
              <StyledView className="mt-2 space-y-1">
                <StyledText className="text-sm font-bold text-white">0 likes</StyledText>
                <StyledView className="flex-row">
                  <StyledText className="text-sm font-bold text-white mr-2">{post.user}</StyledText>
                  <StyledText className="text-sm text-white flex-1">{post.product} — ${post.price}</StyledText>
                </StyledView>
                <StyledText className="text-sm text-zinc-400 leading-relaxed">
                  {post.description}
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
        ))}
      </ScrollView>
    </StyledView>
  );
}
