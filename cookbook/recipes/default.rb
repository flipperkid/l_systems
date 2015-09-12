#
# Cookbook Name:: citadel_cookbook
# Recipe:: default
#
# Copyright (C) 2015 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#
%w{curl vim git}.each do |pkg|
  package pkg do
    action :install
  end
end

