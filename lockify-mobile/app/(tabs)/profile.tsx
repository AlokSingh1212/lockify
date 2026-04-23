import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Settings, Grid, Bookmark, Tag, MapPin, Link as LinkIcon } from 'lucide-react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  return (
    <StyledView className="flex-1 bg-black pt-12">
      {/* Profile Header */}
      <StyledView className="flex-row items-center justify-between px-4 py-2">
        <StyledText className="text-xl font-bold text-white">jordan_tech</StyledText>
        <TouchableOpacity>
          <Settings size={24} color="#fff" />
        </TouchableOpacity>
      </StyledView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Section */}
        <StyledView className="px-4 py-4 flex-row items-center justify-between">
          <StyledView className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 to-purple-600">
            <StyledView className="w-full h-full rounded-full bg-zinc-900 items-center justify-center">
              <StyledText className="text-3xl font-bold text-white">J</StyledText>
            </StyledView>
          </StyledView>
          
          <StyledView className="flex-row gap-8 pr-4">
            <StyledView className="items-center">
              <StyledText className="text-lg font-bold text-white">12</StyledText>
              <StyledText className="text-xs text-zinc-400">Posts</StyledText>
            </StyledView>
            <StyledView className="items-center">
              <StyledText className="text-lg font-bold text-white">1.2k</StyledText>
              <StyledText className="text-xs text-zinc-400">Followers</StyledText>
            </StyledView>
            <StyledView className="items-center">
              <StyledText className="text-lg font-bold text-white">450</StyledText>
              <StyledText className="text-xs text-zinc-400">Following</StyledText>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Bio Section (The "Nas.com" Link Hub) */}
        <StyledView className="px-4 space-y-1">
          <StyledText className="text-sm font-bold text-white">Jordan's Tech Store</StyledText>
          <StyledText className="text-sm text-zinc-300">Creator & Tech Enthusiast</StyledText>
          <StyledView className="flex-row items-center gap-1">
            <MapPin size={12} color="#a1a1aa" />
            <StyledText className="text-xs text-zinc-400">San Francisco, CA</StyledText>
          </StyledView>
          <TouchableOpacity className="flex-row items-center gap-1 py-1">
            <LinkIcon size={14} color="#3b82f6" />
            <StyledText className="text-sm font-bold text-blue-500">lockify.ai/jordan-tech</StyledText>
          </TouchableOpacity>
        </StyledView>

        {/* Profile Buttons */}
        <StyledView className="flex-row gap-2 px-4 py-4">
          <TouchableOpacity className="flex-1 bg-zinc-800 py-2 rounded-lg items-center">
            <StyledText className="text-sm font-bold text-white">Edit Profile</StyledText>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-zinc-800 py-2 rounded-lg items-center">
            <StyledText className="text-sm font-bold text-white">Share Profile</StyledText>
          </TouchableOpacity>
        </StyledView>

        {/* Tab Selection */}
        <StyledView className="flex-row border-t border-zinc-900 mt-2">
          <TouchableOpacity className="flex-1 items-center py-3 border-b-2 border-white">
            <Grid size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center py-3">
            <Tag size={24} color="#8e8e8e" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center py-3">
             <Bookmark size={24} color="#8e8e8e" />
          </TouchableOpacity>
        </StyledView>

        {/* Product Grid */}
        <StyledView className="flex-row flex-wrap">
          {[...Array(9)].map((_, i) => (
            <StyledView 
              key={i} 
              style={{ width: width / 3, height: width / 3 }} 
              className="border-[0.5px] border-black bg-zinc-900 items-center justify-center"
            >
               <StyledText className="text-zinc-700 font-bold">{i + 1}</StyledText>
            </StyledView>
          ))}
        </StyledView>
      </ScrollView>
    </StyledView>
  );
}
